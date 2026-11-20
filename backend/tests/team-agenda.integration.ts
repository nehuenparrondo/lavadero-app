import { test } from 'node:test';
import assert from 'node:assert/strict';
import { database } from '../src/config/database.js';
import {
  api,
  admin,
  client,
  employee,
  vehicle,
  firstSlot,
  future,
  verifyWash,
} from './support/context.js';

test('agenda compartida, asignación visible e inicio exclusivo y atómico', async () => {
  const owner = await admin();
  const customer = await client();
  const staff = await employee(owner.accessToken);
  const peer = await employee(owner.accessToken);
  const car = await vehicle(customer.accessToken);
  const date = future(60);
  const { serviceId, quote } = await firstSlot(customer.accessToken, car.id, date);
  const created = (
    await api('post', '/appointments', customer.accessToken, {
      vehicleId: car.id,
      serviceIds: [serviceId],
      startsAt: quote.slots[0],
    }).expect(201)
  ).body.data;
  assert.equal(created.status, 'confirmed');
  assert.ok(created.employeeName);
  await api('patch', `/appointments/${created.id}/assignment`, owner.accessToken, {
    employeeId: staff.user.id,
  }).expect(200);
  for (const worker of [staff, peer]) {
    const list = await api('get', '/appointments', worker.accessToken)
      .query({ date, history: 'false', plate: car.plate.toLowerCase() })
      .expect(200);
    assert.ok(list.body.data.items.some((item: { id: string }) => item.id === created.id));
    const summary = await api('get', '/reports/me', worker.accessToken)
      .query({ date })
      .expect(200);
    assert.ok(summary.body.data.pending > 0);
  }
  await api('patch', `/appointments/${created.id}/status`, peer.accessToken, {
    status: 'in_progress',
  }).expect(403);
  const results = await Promise.all(
    [staff, staff].map((worker) =>
      api('patch', `/appointments/${created.id}/status`, worker.accessToken, {
        status: 'in_progress',
      }),
    ),
  );
  assert.deepEqual(results.map((r) => r.status).sort(), [200, 409]);
  const privateView = (
    await api('get', `/appointments/${created.id}`, customer.accessToken).expect(200)
  ).body.data;
  assert.equal(privateView.employeeName, staff.user.firstName + ' ' + staff.user.lastName);
  assert.ok(!('employeeId' in privateView));
  const adminView = (
    await api('get', `/appointments/${created.id}`, owner.accessToken).expect(200)
  ).body.data;
  assert.equal(adminView.employeeId, staff.user.id);
  await verifyWash(staff.accessToken, owner.accessToken, created.id, quote.slots[0]!);
  for (const worker of [staff, peer]) {
    const history = await api('get', '/appointments', worker.accessToken)
      .query({ date, history: 'true' })
      .expect(200);
    assert.ok(history.body.data.items.some((item: { id: string }) => item.id === created.id));
  }
});

test('turnos pendientes anteriores siguen visibles y se pueden comenzar desde cualquier empleado', async () => {
  const owner = await admin();
  const customer = await client();
  const staff = await employee(owner.accessToken);
  const car = await vehicle(customer.accessToken);
  const { serviceId, quote } = await firstSlot(customer.accessToken, car.id, future(70));
  const created = (
    await api('post', '/appointments', customer.accessToken, {
      vehicleId: car.id,
      serviceIds: [serviceId],
      startsAt: quote.slots[0],
    }).expect(201)
  ).body.data;
  await database!.execute(
    "UPDATE turnos SET status_id=(SELECT id FROM estados_turno WHERE code='pending'),employee_id=NULL WHERE id=?",
    [created.id],
  );
  await api('get', `/appointments/${created.id}`, staff.accessToken).expect(200);
  await api('patch', `/appointments/${created.id}/status`, staff.accessToken, {
    status: 'in_progress',
  }).expect(200);
});
