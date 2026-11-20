import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { admin, api, client, employee, future, vehicle } from './support/context.js';

type CatalogService = {
  id: string;
  code: string;
  prices: { vehicleTypeId: string; priceCents: number }[];
};

async function catalog(token: string) {
  const types = (await api('get', '/vehicle-types', token).expect(200)).body.data as {
    id: string;
    code: string;
  }[];
  const services = (await api('get', '/services', token).expect(200)).body
    .data as CatalogService[];
  return {
    type: (code: string) => types.find((t) => t.code === code)!,
    service: (code: string) => services.find((s) => s.code === code)!,
    services,
  };
}

test('reserva sin vehículo, ocupa el horario y vincula los datos bajo el mismo bloqueo', async () => {
  const manager = await admin();
  const first = await client();
  const second = await client();
  const staff = await employee(manager.accessToken);
  const { type, service } = await catalog(first.accessToken);
  const date = future(130);
  const vehicleTypeId = type('car').id;
  const serviceId = service('exterior').id;
  const availability = (token: string) =>
    api('get', '/availability', token).query({ date, vehicleTypeId, serviceIds: serviceId });
  const empty = await api('get', '/vehicles', first.accessToken).expect(200);
  assert.equal(empty.body.data.total, 0);
  const {
    body: { data: quote },
  } = await availability(first.accessToken).expect(200);
  const startsAt = quote.slots[0];
  const body = { startsAt, vehicleTypeId, serviceIds: [serviceId] };
  const results = await Promise.all(
    [first, second].map((c) => api('post', '/appointments', c.accessToken, body)),
  );
  assert.deepEqual(results.map((r) => r.status).sort(), [201, 409]);
  const winner = results[0]!.status === 201 ? first : second;
  const outsider = winner === first ? second : first;
  const appointment = results.find((r) => r.status === 201)!.body.data;
  assert.equal(appointment.status, 'confirmed');
  assert.equal(appointment.vehicleId, null);
  assert.equal(appointment.vehiclePending, true);
  assert.equal(appointment.totalCents, quote.totalCents);
  const refreshed = (await availability(outsider.accessToken).expect(200)).body.data.slots;
  assert.ok(!refreshed.includes(startsAt));

  const base = `/appointments/${appointment.id}`;
  await api('patch', base + '/assignment', manager.accessToken, {
    employeeId: staff.user.id,
  }).expect(200);
  const agenda = await api('get', '/appointments', staff.accessToken)
    .query({ date, limit: 100 })
    .expect(200);
  const reserved = agenda.body.data.items.find(
    (item: { id: string }) => item.id === appointment.id,
  );
  assert.ok(reserved);
  assert.equal(reserved.vehiclePending, true);
  assert.equal(reserved.canWork, false);
  const blocked = await api('patch', base + '/status', staff.accessToken, {
    status: 'in_progress',
  }).expect(409);
  assert.equal(blocked.body.error.code, 'VEHICLE_REQUIRED');

  const wrongVehicle = (
    await api('post', '/vehicles', winner.accessToken, {
      plate: 'M' + randomUUID().slice(0, 8),
      brand: 'Honda',
      model: 'Moto',
      color: 'Roja',
      vehicleTypeId: type('motorcycle').id,
    }).expect(201)
  ).body.data;
  await api('put', base + '/vehicle', winner.accessToken, {
    vehicleId: wrongVehicle.id,
  }).expect(409);
  const otherVehicle = await vehicle(outsider.accessToken);
  await api('put', base + '/vehicle', winner.accessToken, {
    vehicleId: otherVehicle.id,
  }).expect(404);

  const newVehicle = {
    plate: 'A' + randomUUID().slice(0, 8),
    brand: 'Toyota',
    model: 'Corolla',
    color: 'Gris',
  };
  const attach = (token: string) =>
    api('put', base + '/vehicle', token, { vehicle: newVehicle });
  await attach(outsider.accessToken).expect(404);
  await attach(staff.accessToken).expect(403);
  const [linked, replay] = await Promise.all([
    attach(winner.accessToken),
    attach(winner.accessToken),
  ]);
  assert.equal(linked.status, 200);
  assert.equal(replay.status, 200);
  assert.equal(linked.body.data.vehicleId, replay.body.data.vehicleId);
  const detail = (await api('get', base, winner.accessToken).expect(200)).body.data;
  assert.equal(detail.plate, newVehicle.plate.toUpperCase());
  assert.equal(detail.vehiclePending, false);
  assert.equal(detail.startsAt, startsAt);
  assert.equal(detail.totalCents, quote.totalCents);
  await api('patch', base + '/status', staff.accessToken, { status: 'in_progress' }).expect(
    200,
  );
});

test('vincula vehículo existente y la cancelación de un turno incompleto libera el horario', async () => {
  const customer = await client();
  const car = await vehicle(customer.accessToken);
  const { type, service } = await catalog(customer.accessToken);
  const date = future(140);
  const vehicleTypeId = type('car').id;
  const serviceId = service('interior').id;
  const list = () =>
    api('get', '/availability', customer.accessToken)
      .query({ date, vehicleTypeId, serviceIds: serviceId })
      .expect(200);
  const startsAt = (await list()).body.data.slots[0];
  const create = () =>
    api('post', '/appointments', customer.accessToken, {
      vehicleTypeId,
      serviceIds: [serviceId],
      startsAt,
    }).expect(201);
  const first = (await create()).body.data;
  await api('post', `/appointments/${first.id}/cancel`, customer.accessToken, {
    reason: 'Cambio de planes.',
  }).expect(200);
  assert.ok((await list()).body.data.slots.includes(startsAt));
  const second = (await create()).body.data;
  await api('put', `/appointments/${second.id}/vehicle`, customer.accessToken, {
    vehicleId: car.id,
  }).expect(200);
  assert.equal(
    (await api('get', `/appointments/${second.id}`, customer.accessToken).expect(200)).body
      .data.plate,
    car.plate,
  );
});

test('moto solo ofrece lavado; los demás eligen un lavado base con extras opcionales', async () => {
  const customer = await client();
  const { type, service, services } = await catalog(customer.accessToken);
  const moto = type('motorcycle').id;
  const car = type('car').id;
  const motoServices = services.filter((s) => s.prices.some((p) => p.vehicleTypeId === moto));
  assert.deepEqual(
    motoServices.map((s) => s.code),
    ['motorcycle_wash'],
  );
  assert.equal(
    motoServices[0]!.prices.find((p) => p.vehicleTypeId === moto)!.priceCents,
    1500000,
  );
  const quote = (vehicleTypeId: string, ...codes: string[]) =>
    api('get', '/availability', customer.accessToken).query({
      date: future(150),
      vehicleTypeId,
      serviceIds: codes.map((code) => service(code).id).join(','),
    });
  const motoQuote = await quote(moto, 'motorcycle_wash').expect(200);
  assert.equal(motoQuote.body.data.totalCents, 1500000);
  await quote(moto, 'exterior').expect(400);
  await quote(moto, 'motorcycle_wash', 'wax').expect(400);
  await quote(car, 'motorcycle_wash').expect(400);
  await quote(car, 'exterior', 'interior').expect(400);
  await quote(car, 'interior', 'wax').expect(400);
  const extras = await quote(car, 'complete', 'wax', 'upholstery').expect(200);
  assert.equal(extras.body.data.totalCents, 6300000);
  assert.equal(extras.body.data.durationMinutes, 90);
  assert.equal((await quote(car, 'upholstery').expect(200)).body.data.totalCents, 2000000);
});

test('Administración da de alta un tipo con tarifas y revierte cambios incompatibles', async () => {
  const manager = await admin();
  const customer = await client();
  const { service } = await catalog(manager.accessToken);
  const base = {
    code: 'tipo_' + randomUUID().slice(0, 8),
    name: 'Categoría de prueba',
    isActive: true,
  };
  const prices = [
    { serviceId: service('exterior').id, priceCents: 1800000 },
    { serviceId: service('interior').id, priceCents: 1900000 },
  ];
  await api('post', '/vehicle-types', customer.accessToken, { ...base, prices }).expect(403);
  const created = (
    await api('post', '/vehicle-types', manager.accessToken, { ...base, prices }).expect(201)
  ).body.data;
  const list = () => api('get', '/vehicle-types', manager.accessToken).expect(200);
  await api('put', `/vehicle-types/${created.id}`, manager.accessToken, {
    ...base,
    name: 'Cambio que debe revertirse',
    prices: [
      { ...prices[0]!, priceCents: 2000000 },
      { serviceId: service('motorcycle_wash').id, priceCents: 1000000 },
    ],
  }).expect(400);
  assert.equal(
    (await list()).body.data.find((t: { id: string }) => t.id === created.id).name,
    base.name,
  );
  const price = (await catalog(customer.accessToken))
    .service('exterior')
    .prices.find((p) => p.vehicleTypeId === created.id);
  assert.equal(price?.priceCents, 1800000);
});
