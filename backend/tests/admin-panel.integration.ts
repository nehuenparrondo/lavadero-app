import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { DateTime } from 'luxon';
import { rows } from '../src/utils/db.js';
import {
  admin,
  api,
  atBusinessTime,
  client,
  employee,
  future,
  testPassword,
  vehicle,
} from './support/context.js';

const plate = () => randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase();
const day = () => future(170 + Math.floor(Math.random() * 100));
async function input(token: string) {
  const types = (await api('get', '/vehicle-types', token).expect(200)).body.data;
  const services = (await api('get', '/services', token).expect(200)).body.data;
  return {
    requestId: randomUUID(),
    plate: plate(),
    vehicleTypeId: types.find((v: { code: string }) => v.code === 'car').id,
    serviceIds: [services.find((s: { code: string }) => s.code === 'exterior').id],
  };
}

test('ingreso sin cuenta ni garaje: permisos, reintento, persistencia, búsqueda y revisión real', async () => {
  const owner = await admin();
  const customer = await client();
  const staff = await employee(owner.accessToken);
  const data = {
    ...(await input(owner.accessToken)),
    customerName: 'Presencial QA',
    customerPhone: '1100000000',
    notes: "Revisar rayón del lateral. 'Sin turno' 🚗",
  };
  const instant = day() + 'T10:00:00-03:00';
  await api('post', '/appointments/walk-in', customer.accessToken, data).expect(403);
  await api('post', '/appointments/walk-in', staff.accessToken, data).expect(403);
  const responses = await atBusinessTime(instant, () =>
    Promise.all(
      [1, 2].map(() =>
        api('post', '/appointments/walk-in', owner.accessToken, data).expect(201),
      ),
    ),
  );
  const booked = responses[0]!.body.data;
  assert.equal(booked.id, responses[1]!.body.data.id);
  assert.equal(booked.clientId, null);
  assert.equal(booked.vehicleId, null);
  assert.equal(booked.vehiclePending, false);
  assert.equal(booked.isWalkIn, true);
  assert.equal(booked.status, 'confirmed');
  const service = (
    await api('get', '/services/' + data.serviceIds[0], owner.accessToken).expect(200)
  ).body.data;
  const expectedPrice = service.prices.find(
    (p: { vehicleTypeId: string }) => p.vehicleTypeId === data.vehicleTypeId,
  ).priceCents;
  assert.equal(booked.totalCents, expectedPrice);
  const path = '/appointments/' + booked.id;
  const detail = (await api('get', path, owner.accessToken).expect(200)).body.data;
  assert.equal(detail.notes[0].body, data.notes);
  assert.equal(detail.clientName, data.customerName);
  await api('get', path, customer.accessToken).expect(404);
  assert.equal((await rows('SELECT id FROM vehiculos WHERE plate=?', [data.plate])).length, 0);
  assert.equal(
    (
      await rows('SELECT appointment_id FROM ingresos_sin_turno WHERE request_id=?', [
        data.requestId,
      ])
    ).length,
    1,
  );
  const found = (
    await api('get', '/appointments', staff.accessToken)
      .query({ plate: data.plate })
      .expect(200)
  ).body.data;
  assert.equal(found.items[0].id, booked.id);
  await api('patch', path + '/assignment', owner.accessToken, {
    employeeId: staff.user.id,
  }).expect(200);
  await api('patch', path + '/status', staff.accessToken, { status: 'in_progress' }).expect(
    200,
  );
  await atBusinessTime(instant, async () => {
    await api('post', path + '/wash-submission', staff.accessToken, {
      description: 'Exterior terminado y revisado.',
    }).expect(201);
    const submitted = (await api('get', path, owner.accessToken).expect(200)).body.data;
    await api('patch', path + '/wash-review', owner.accessToken, {
      submissionId: submitted.wash.id,
      decision: 'approved',
    }).expect(200);
  });
  await api('post', path + '/payments', owner.accessToken, {
    idempotencyKey: randomUUID(),
    method: 'cash',
    amountCents: booked.totalCents,
  }).expect(201);
  const receipt = (await api('get', path + '/receipt', owner.accessToken).expect(200)).body
    .data;
  assert.equal(receipt.paidCents, expectedPrice);
  assert.equal(receipt.status, 'completed');
});

test('ingresos distintos serializan cupos; misma patente no duplica; fuera de horario revierte todo', async () => {
  const owner = await admin();
  const a = await input(owner.accessToken);
  const b = { ...a, requestId: randomUUID(), plate: plate() };
  const date = day();
  const accepted = await atBusinessTime(date + 'T09:30:00-03:00', () =>
    Promise.all(
      [a, b].map((body) =>
        api('post', '/appointments/walk-in', owner.accessToken, body).expect(201),
      ),
    ),
  );
  const slots = accepted
    .map((r) => r.body.data)
    .sort((x, y) => x.startsAt.localeCompare(y.startsAt));
  assert.ok(Date.parse(slots[0].endsAt) <= Date.parse(slots[1].startsAt));
  await atBusinessTime(date + 'T10:00:00-03:00', () =>
    api('post', '/appointments/walk-in', owner.accessToken, {
      ...a,
      requestId: randomUUID(),
    }).expect(409),
  );
  const rejected = { ...a, requestId: randomUUID(), plate: plate() };
  for (const instant of [
    date + 'T09:29:59-03:00',
    date + 'T16:30:00-03:00',
    '2027-11-14T12:00:00-03:00',
  ])
    await atBusinessTime(instant, () =>
      api('post', '/appointments/walk-in', owner.accessToken, rejected).expect(409),
    );
  assert.equal(
    (
      await rows('SELECT appointment_id FROM ingresos_sin_turno WHERE request_id=?', [
        rejected.requestId,
      ])
    ).length,
    0,
  );
});

test('patente registrada conserva garaje y titular; cancelación exige motivo y llega al cliente', async () => {
  const owner = await admin();
  const customer = await client();
  const car = await vehicle(customer.accessToken);
  const data = { ...(await input(owner.accessToken)), plate: car.plate };
  // El fixture de vehículo toma la primera categoría; usamos esa misma categoría.
  const registered = (
    await api('get', '/vehicles/' + car.id, customer.accessToken).expect(200)
  ).body.data;
  data.vehicleTypeId = registered.vehicleTypeId;
  const booked = (
    await atBusinessTime(day() + 'T10:00:00-03:00', () =>
      api('post', '/appointments/walk-in', owner.accessToken, data).expect(201),
    )
  ).body.data;
  assert.equal(booked.clientId, customer.user.id);
  assert.equal(booked.vehicleId, car.id);
  const path = '/appointments/' + booked.id;
  for (const reason of ['', '   ', 'a'.repeat(501)])
    await api('post', path + '/cancel', owner.accessToken, { reason }).expect(400);
  await api('patch', path + '/status', owner.accessToken, { status: 'cancelled' }).expect(400);
  assert.equal(
    (await api('get', path, owner.accessToken).expect(200)).body.data.status,
    'confirmed',
  );
  await api('post', path + '/cancel', owner.accessToken, {
    reason: 'Corte de agua en el local.',
  }).expect(200);
  const notices = (
    await api('get', '/appointments/cancellation-notices', customer.accessToken).expect(200)
  ).body.data;
  assert.equal(notices[0].reason, 'Corte de agua en el local.');
  assert.deepEqual(
    (await api('get', '/vehicles/' + car.id, customer.accessToken).expect(200)).body.data,
    registered,
  );
});

test('fichaje solo laboral y creación administrativa sin rol admin', async () => {
  const owner = await admin();
  const staff = await employee(owner.accessToken);
  const date = day();
  const path = '/attendance/' + staff.user.id + '/arrival';
  for (const time of ['09:29:59', '16:30:00'])
    await atBusinessTime(date + 'T' + time + '-03:00', () =>
      api('post', path, owner.accessToken, { date }).expect(409),
    );
  await atBusinessTime(date + 'T09:30:00-03:00', async () => {
    assert.equal(
      (await api('get', '/attendance', owner.accessToken).expect(200)).body.data.canRecord,
      true,
    );
    await api('post', path, owner.accessToken, { date: '2020-01-01' }).expect(409);
    await Promise.all(
      [1, 2].map(() => api('post', path, owner.accessToken, { date }).expect(200)),
    );
  });
  const attendance = (
    await api('get', '/attendance', owner.accessToken).query({ date }).expect(200)
  ).body.data;
  assert.equal(attendance.canRecord, false);
  assert.equal(
    attendance.items.filter((r: { employeeId: string }) => r.employeeId === staff.user.id)
      .length,
    1,
  );
  const sunday = DateTime.fromISO(date).startOf('week').plus({ days: 6 }).toISODate()!;
  await atBusinessTime(sunday + 'T12:00:00-03:00', () =>
    api('post', path, owner.accessToken, { date: sunday }).expect(409),
  );
  const account = {
    email: randomUUID() + '@example.invalid',
    password: testPassword,
    firstName: 'Alta',
    lastName: 'QA',
  };
  await api('post', '/users', owner.accessToken, { ...account, role: 'admin' }).expect(400);
  const created = (
    await api('post', '/users', owner.accessToken, { ...account, role: 'client' }).expect(201)
  ).body.data;
  await api('patch', '/users/' + created.id, owner.accessToken, { role: 'employee' }).expect(
    400,
  );
  await api('patch', '/users/' + created.id, owner.accessToken, {
    firstName: 'Editado',
  }).expect(200);
  assert.equal(
    (await api('get', '/users/' + created.id, owner.accessToken).expect(200)).body.data.role,
    'client',
  );
  await api('delete', '/users/' + created.id, owner.accessToken).expect(200);
});
