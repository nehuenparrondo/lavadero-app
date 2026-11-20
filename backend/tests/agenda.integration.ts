import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  admin,
  api,
  client,
  employee,
  firstSlot,
  future,
  vehicle,
} from './support/context.js';

test('las nuevas solicitudes aparecen primero en pendientes aunque su fecha sea posterior', async () => {
  const owner = await admin();
  const customer = await client();
  const staff = await employee(owner.accessToken);
  const car = await vehicle(customer.accessToken);
  const make = async (date: string) => {
    const { serviceId, quote } = await firstSlot(customer.accessToken, car.id, date);
    return (
      await api('post', '/appointments', customer.accessToken, {
        vehicleId: car.id,
        serviceIds: [serviceId],
        startsAt: quote.slots[0],
      }).expect(201)
    ).body.data;
  };
  const first = await make(future(185));
  const last = await make(future(190));
  const query = () =>
    api('get', '/appointments', owner.accessToken)
      .query({ queue: 'requested', limit: 100 })
      .expect(200);
  const items = (await query()).body.data.items;
  assert.equal(items[0].id, last.id);
  assert.equal(items[1].id, first.id);
  assert.ok(
    items.every((item: { status: string }) => ['pending', 'confirmed'].includes(item.status)),
  );
  await api('get', '/appointments', customer.accessToken)
    .query({ queue: 'requested' })
    .expect(403);
  await api('get', '/appointments', staff.accessToken)
    .query({ queue: 'requested' })
    .expect(403);
  await api('post', `/appointments/${last.id}/cancel`, customer.accessToken, {
    reason: 'Cambio de planes.',
  }).expect(200);
  assert.ok(
    !(await query()).body.data.items.some((item: { id: string }) => item.id === last.id),
  );
  const found = await api('get', '/appointments', owner.accessToken)
    .query({ plate: car.plate })
    .expect(200);
  assert.ok(found.body.data.items.some((item: { id: string }) => item.id === first.id));
});
