import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import {
  api,
  admin,
  client,
  vehicle,
  future,
  firstSlot,
  employee,
  verifyWash,
} from './support/context.js';

test('perfil, vehículo, categorías, servicios y tarifas completan su ciclo administrativo', async () => {
  const owner = await admin();
  const customer = await client();
  await api('patch', '/users/me', customer.accessToken, {
    firstName: 'Perfil actualizado',
    phone: '1100000001',
  }).expect(200);
  assert.equal(
    (await api('get', '/users/me', customer.accessToken).expect(200)).body.data.firstName,
    'Perfil actualizado',
  );
  const code = 'qa_' + randomUUID().slice(0, 8);
  const type = (
    await api('post', '/vehicle-types', owner.accessToken, {
      code,
      name: 'Categoría QA',
    }).expect(201)
  ).body.data;
  await api('put', `/vehicle-types/${type.id}`, owner.accessToken, {
    code,
    name: 'Categoría editada',
    isActive: true,
  }).expect(200);
  const car = await vehicle(customer.accessToken);
  await api('patch', `/vehicles/${car.id}`, customer.accessToken, {
    vehicleTypeId: type.id,
    color: 'Gris',
  }).expect(200);
  const service = (
    await api('post', '/services', owner.accessToken, {
      code,
      name: 'Servicio QA',
      description: 'Servicio exclusivo de aceptación local',
      durationMinutes: 35,
    }).expect(201)
  ).body.data;
  await api('patch', `/services/${service.id}`, owner.accessToken, {
    name: 'Servicio editado',
    durationMinutes: 40,
  }).expect(200);
  await api('put', `/services/${service.id}/prices/${type.id}`, owner.accessToken, {
    priceCents: 123400,
  }).expect(200);
  const quote = await api('get', '/availability', customer.accessToken)
    .query({ vehicleId: car.id, serviceIds: service.id, date: future(90) })
    .expect(200);
  assert.equal(quote.body.data.totalCents, 123400);
  assert.equal(quote.body.data.durationMinutes, 40);
  await api('delete', `/services/${service.id}`, customer.accessToken).expect(403);
  await api('delete', `/vehicles/${car.id}`, customer.accessToken).expect(200);
  await api('delete', `/services/${service.id}`, owner.accessToken).expect(200);
  await api('get', `/services/${service.id}`, customer.accessToken).expect(404);
  await api('delete', `/vehicle-types/${type.id}`, owner.accessToken).expect(200);
  const types = (await api('get', '/vehicle-types', customer.accessToken).expect(200)).body
    .data;
  assert.ok(!types.some((item: { id: string }) => item.id === type.id));
});

test('configuración se guarda y los reportes aceptan todos los períodos', async () => {
  const owner = await admin();
  const customer = await client();
  const original = (await api('get', '/settings', owner.accessToken).expect(200)).body.data;
  const body = { ...original };
  delete body.currencyCode;
  body.hours = original.hours.map(
    (hour: { weekday: number; opensAt: string; closesAt: string }) => ({
      weekday: hour.weekday,
      opensAt: hour.opensAt.slice(0, 5),
      closesAt: hour.closesAt.slice(0, 5),
    }),
  );
  await api('put', '/settings', customer.accessToken, body).expect(403);
  await api('put', '/settings', owner.accessToken, {
    ...body,
    cancellationNoticeMinutes: 180,
  }).expect(200);
  assert.equal(
    (await api('get', '/business', customer.accessToken).expect(200)).body.data
      .cancellationNoticeMinutes,
    180,
  );
  await api('put', '/settings', owner.accessToken, body).expect(200);
  for (const period of ['day', 'week', 'month']) {
    const report = await api('get', '/reports', owner.accessToken)
      .query({ period, date: future(10) })
      .expect(200);
    assert.equal(report.body.data.currencyCode, 'ARS');
    assert.ok(Array.isArray(report.body.data.days));
  }
});

test('pagos parciales por transferencia y efectivo conservan saldo e idempotencia', async () => {
  const owner = await admin();
  const staff = await employee(owner.accessToken);
  const customer = await client();
  const car = await vehicle(customer.accessToken);
  const { serviceId, quote } = await firstSlot(customer.accessToken, car.id, future(100));
  const appointment = (
    await api('post', '/appointments', customer.accessToken, {
      vehicleId: car.id,
      serviceIds: [serviceId],
      startsAt: quote.slots[0],
    }).expect(201)
  ).body.data;
  await api('patch', `/appointments/${appointment.id}/assignment`, owner.accessToken, {
    employeeId: staff.user.id,
  }).expect(200);
  await api('patch', `/appointments/${appointment.id}/status`, staff.accessToken, {
    status: 'in_progress',
  }).expect(200);
  const partial = Math.floor(quote.totalCents / 2);
  const first = {
    amountCents: partial,
    method: 'transfer',
    reference: 'QA local',
    idempotencyKey: randomUUID(),
  };
  await api(
    'post',
    `/appointments/${appointment.id}/payments`,
    owner.accessToken,
    first,
  ).expect(201);
  await api('post', `/appointments/${appointment.id}/payments`, owner.accessToken, {
    ...first,
    amountCents: partial + 1,
  }).expect(409);
  await api('post', `/appointments/${appointment.id}/payments`, owner.accessToken, {
    amountCents: quote.totalCents - partial,
    method: 'cash',
    idempotencyKey: randomUUID(),
  }).expect(201);
  const payments = await api(
    'get',
    `/appointments/${appointment.id}/payments`,
    customer.accessToken,
  ).expect(200);
  assert.equal(payments.body.data.length, 2);
  await verifyWash(staff.accessToken, owner.accessToken, appointment.id, quote.slots[0]!);
  const receipt = await api(
    'get',
    `/appointments/${appointment.id}/receipt`,
    customer.accessToken,
  ).expect(200);
  assert.equal(receipt.body.data.paidCents, quote.totalCents);
});
