import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execute } from '../src/utils/db.js';
import { admin, api, atBusinessTime, client, employee, future } from './support/context.js';

type Service = {
  id: string;
  code: string;
  prices: { vehicleTypeId: string; priceCents: number }[];
};
type Category = { id: string; code: string };
type Booking = {
  id: string;
  startsAt: string;
  endsAt: string;
  employeeId: string;
  version: number;
  totalCents: number;
};

async function catalog(token: string) {
  return {
    services: (await api('get', '/services', token).expect(200)).body.data as Service[],
    types: (await api('get', '/vehicle-types', token).expect(200)).body.data as Category[],
  };
}

async function reserve(token: string, offset: number): Promise<Booking> {
  const { services, types } = await catalog(token);
  const vehicleTypeId = types.find((type) => type.code === 'car')!.id;
  const serviceIds = [services.find((service) => service.code === 'exterior')!.id];
  const quote = (
    await api('get', '/availability', token)
      .query({ date: future(offset), vehicleTypeId, serviceIds: serviceIds.join(',') })
      .expect(200)
  ).body.data;
  assert.ok(quote.slots.length > 0, 'La fecha de QA debe tener un horario disponible.');
  return (
    await api('post', '/appointments', token, {
      vehicleTypeId,
      serviceIds,
      startsAt: quote.slots[0],
    }).expect(201)
  ).body.data;
}

test('las seis tarifas coinciden para los tres roles, cotización y reserva', async () => {
  const owner = await admin();
  const customer = await client();
  const staff = await employee(owner.accessToken);
  const expected = { car: 1500000, pickup: 2000000, suv: 1700000 };
  for (const session of [owner, customer, staff]) {
    const { services, types } = await catalog(session.accessToken);
    for (const [code, cents] of Object.entries(expected)) {
      const type = types.find((item) => item.code === code)!;
      for (const wash of ['interior', 'exterior']) {
        const service = services.find((item) => item.code === wash)!;
        assert.equal(
          service.prices.find((price) => price.vehicleTypeId === type.id)!.priceCents,
          cents,
        );
        if (session === customer) {
          const quote = await api('get', '/availability', customer.accessToken)
            .query({ date: future(310), vehicleTypeId: type.id, serviceIds: service.id })
            .expect(200);
          assert.equal(quote.body.data.totalCents, cents);
        }
      }
    }
  }
  const booked = await reserve(customer.accessToken, 311);
  assert.equal(booked.totalCents, expected.car);
  const saved = (
    await api('get', '/appointments/' + booked.id, customer.accessToken).expect(200)
  ).body.data;
  assert.equal(saved.totalCents, expected.car);
  assert.equal(saved.services[0].priceCents, expected.car);
});

test('los tres empleados se guardan; repetir responsable no altera versión ni elude controles', async () => {
  const owner = await admin();
  const customer = await client();
  const team = [];
  for (let i = 0; i < 3; i++) team.push(await employee(owner.accessToken));
  const booked = await reserve(customer.accessToken, 313);
  const base = '/appointments/' + booked.id;
  const detail = async () =>
    (await api('get', base, owner.accessToken).expect(200)).body.data as Booking;
  const assign = (id: string) =>
    api('patch', base + '/assignment', owner.accessToken, { employeeId: id });
  for (const worker of [...team, team[0]!]) {
    await assign(worker.user.id).expect(200);
    const before = await detail();
    assert.equal(before.employeeId, worker.user.id);
    await assign(worker.user.id).expect(200);
    assert.equal((await detail()).version, before.version);
  }
  await assign(customer.user.id).expect(400);
  await api('patch', '/users/' + team[0]!.user.id, owner.accessToken, {
    isActive: false,
  }).expect(200);
  await assign(team[0]!.user.id).expect(400);
  await api('patch', '/users/' + team[0]!.user.id, owner.accessToken, {
    isActive: true,
  }).expect(200);
  await assign(team[2]!.user.id).expect(200);
  // Solo fixtures: un conflicto real en otra reserva debe seguir rechazando la reasignación.
  const other = await client();
  const clash = await reserve(other.accessToken, 315);
  await execute('UPDATE turnos SET starts_at=?,ends_at=?,employee_id=? WHERE id=?', [
    booked.startsAt.replace('T', ' ').replace('Z', ''),
    booked.endsAt.replace('T', ' ').replace('Z', ''),
    team[0]!.user.id,
    clash.id,
  ]);
  const rejected = await assign(team[0]!.user.id).expect(409);
  assert.equal(rejected.body.error.code, 'EMPLOYEE_BUSY');
  assert.equal((await detail()).employeeId, team[2]!.user.id);
  await api('post', '/appointments/' + clash.id + '/cancel', owner.accessToken, {
    reason: 'Fin de fixture de conflicto.',
  }).expect(200);
});

test('pendientes y su contador excluyen días anteriores, conservando hoy y futuro e historial', async () => {
  const owner = await admin();
  const customer = await client();
  const bookings: Booking[] = [];
  for (const offset of [317, 319, 321])
    bookings.push(await reserve(customer.accessToken, offset));
  for (const [index, booked] of bookings.entries()) {
    const date = `2026-11-${26 + index}`;
    await execute('UPDATE turnos SET starts_at=?,ends_at=? WHERE id=?', [
      date + ' 12:30:00',
      date + ' 13:00:00',
      booked.id,
    ]);
  }
  const query = (queue = true) =>
    api('get', '/appointments', owner.accessToken)
      .query({ clientId: customer.user.id, ...(queue ? { queue: 'requested' } : {}) })
      .expect(200);
  await atBusinessTime('2026-11-28T02:30:00Z', async () => {
    const result = (await query()).body.data;
    assert.equal(result.total, 2);
    assert.deepEqual(
      result.items.map((item: Booking) => item.id),
      [bookings[2]!.id, bookings[1]!.id],
    );
    assert.equal((await query(false)).body.data.total, 3);
  });
  await atBusinessTime('2026-11-28T03:00:00Z', async () => {
    const result = (await query()).body.data;
    assert.equal(result.total, 1);
    assert.equal(result.items[0].id, bookings[2]!.id);
  });
});
