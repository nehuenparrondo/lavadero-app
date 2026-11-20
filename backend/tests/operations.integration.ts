import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  admin,
  api,
  atBusinessTime,
  client,
  employee,
  firstSlot,
  future,
  login,
  vehicle,
} from './support/context.js';

test('patente, detalles, devolución a corrección, aprobación y mensaje asociado al trabajo', async () => {
  const owner = await admin();
  const customer = await client();
  const outsider = await client();
  const staff = await employee(owner.accessToken);
  const peer = await employee(owner.accessToken);
  const car = await vehicle(customer.accessToken);
  const { serviceId, quote } = await firstSlot(customer.accessToken, car.id, future(111));
  const startsAt = quote.slots[0]!;
  const {
    body: { data: booked },
  } = await api('post', '/appointments', customer.accessToken, {
    vehicleId: car.id,
    serviceIds: [serviceId],
    startsAt,
  }).expect(201);
  const path = '/appointments/' + booked.id;
  const get = (token: string) => api('get', path, token).expect(200);
  assert.ok(booked.employeeName);
  await api('patch', path + '/assignment', owner.accessToken, {
    employeeId: staff.user.id,
  }).expect(200);
  await api('patch', path + '/vehicle-detail', outsider.accessToken, {
    description: 'Ajeno',
  }).expect(404);
  await api('patch', path + '/vehicle-detail', customer.accessToken, {
    description: 'Mancha en asiento',
  }).expect(200);
  const found = await api('get', '/appointments', peer.accessToken)
    .query({ plate: car.plate.toLowerCase().replace(/(.{4})/u, '$1-') })
    .expect(200);
  assert.equal(found.body.data.total, 1);
  assert.equal(found.body.data.items[0].id, booked.id);
  assert.ok(found.body.data.items[0].serviceSummary);
  assert.equal(
    (await get(staff.accessToken)).body.data.vehicleDescription,
    'Mancha en asiento',
  );
  await api('patch', path + '/status', staff.accessToken, { status: 'in_progress' }).expect(
    200,
  );
  await api('patch', path + '/vehicle-detail', customer.accessToken, {
    description: 'Tarde',
  }).expect(409);
  await api('patch', path + '/status', owner.accessToken, { status: 'completed' }).expect(409);
  await api('post', path + '/wash-submission', peer.accessToken, {
    description: 'No corresponde',
  }).expect(403);

  const feedback = { kind: 'feedback', body: 'Excelente resultado', appointmentId: booked.id };
  await api('post', '/customer-messages', customer.accessToken, feedback).expect(409);
  const submit = (description: string) =>
    atBusinessTime(startsAt, () =>
      api('post', path + '/wash-submission', staff.accessToken, { description }).expect(201),
    );
  await submit('Se limpió la carrocería.');
  const pending = (await get(owner.accessToken)).body.data;
  assert.equal(pending.status, 'awaiting_review');
  assert.equal((await get(customer.accessToken)).body.data.wash, null);
  await api('get', path + '/receipt', customer.accessToken).expect(409);
  const review = (token: string, submissionId: string, decision: string, note?: string) =>
    api('patch', path + '/wash-review', token, {
      submissionId,
      decision,
      ...(note ? { note } : {}),
    });
  await review(staff.accessToken, pending.wash.id, 'approved').expect(403);
  await review(owner.accessToken, pending.wash.id, 'returned', 'Repasá las llantas').expect(
    200,
  );
  assert.equal((await get(staff.accessToken)).body.data.wash.reviewNote, 'Repasá las llantas');
  await submit('Se limpió la carrocería y las llantas.');
  await review(owner.accessToken, pending.wash.id, 'approved').expect(409);
  const latest = (await get(owner.accessToken)).body.data.wash;
  await atBusinessTime('2026-11-03T16:30:00-03:00', () =>
    review(owner.accessToken, latest.id, 'approved').expect(409),
  );
  await atBusinessTime(startsAt, () =>
    review(owner.accessToken, latest.id, 'approved').expect(200),
  );
  const finished = (await get(customer.accessToken)).body.data;
  assert.equal(finished.status, 'completed');
  assert.equal(finished.wash.description, 'Se limpió la carrocería y las llantas.');
  assert.equal(finished.wash.reviewerName, undefined);
  await api('post', '/customer-messages', outsider.accessToken, feedback).expect(404);
  const duplicate = await Promise.all([
    api('post', '/customer-messages', customer.accessToken, feedback),
    api('post', '/customer-messages', customer.accessToken, feedback),
  ]);
  assert.deepEqual(duplicate.map((r) => r.status).sort(), [201, 409]);
  const inbox = await api('get', '/customer-messages', owner.accessToken)
    .query({ state: 'open' })
    .expect(200);
  const entry = inbox.body.data.items.find(
    (item: { appointmentId: string }) => item.appointmentId === booked.id,
  );
  assert.equal(entry.employeeName, latest.employeeName);
  assert.equal(entry.workDescription, latest.description);
});

test('reclamos privados y respuesta; alta autónoma, rol y fichaje de llegada por admin', async () => {
  const owner = await admin();
  const customer = await client();
  const independent = await client();
  const created = await api('post', '/customer-messages', customer.accessToken, {
    kind: 'complaint',
    body: 'Necesito ayuda con la reserva.',
  }).expect(201);
  assert.equal(
    (await api('get', '/customer-messages', independent.accessToken).expect(200)).body.data
      .total,
    0,
  );
  const reply = '/customer-messages/' + created.body.data.id + '/reply';
  await api('patch', reply, customer.accessToken, { reply: 'No corresponde' }).expect(403);
  await api('patch', reply, owner.accessToken, { reply: 'Lo revisamos en el local.' }).expect(
    200,
  );
  const inbox = await api('get', '/customer-messages', customer.accessToken)
    .query({ state: 'resolved' })
    .expect(200);
  assert.equal(inbox.body.data.items[0].reply, 'Lo revisamos en el local.');

  await api('patch', '/users/' + independent.user.id + '/role', owner.accessToken, {
    role: 'employee',
  }).expect(200);
  const staff = await login(independent.user.email);
  await api('get', '/attendance', staff.accessToken).expect(403);
  await api('get', '/customer-messages', staff.accessToken).expect(403);
  const date = future(150);
  await atBusinessTime(date + 'T10:00:00-03:00', async () => {
    const roster = await api('get', '/attendance', owner.accessToken).expect(200);
    assert.equal(roster.body.data.today, date);
    const path = '/attendance/' + staff.user.id + '/arrival';
    await api('post', path, staff.accessToken, { date }).expect(403);
    await api('post', path, owner.accessToken, { date: '2020-01-01' }).expect(409);
    await Promise.all(
      [1, 2].map(() => api('post', path, owner.accessToken, { date }).expect(200)),
    );
    const recorded = await api('get', '/attendance', owner.accessToken)
      .query({ date })
      .expect(200);
    const arrivals = recorded.body.data.items.filter(
      (item: { employeeId: string }) => item.employeeId === staff.user.id,
    );
    assert.equal(arrivals.length, 1);
    assert.ok(arrivals[0].arrivedAt);
    assert.ok(arrivals[0].recordedByName);
    await api('post', path, owner.accessToken, { date }).expect(200);
    const repeated = await api('get', '/attendance', owner.accessToken)
      .query({ date })
      .expect(200);
    assert.equal(
      repeated.body.data.items.find(
        (item: { employeeId: string }) => item.employeeId === staff.user.id,
      ).arrivedAt,
      arrivals[0].arrivedAt,
    );
  });
});

test('encerado requiere exterior o completo; tapizado y totales usan el catálogo', async () => {
  const customer = await client();
  const car = await vehicle(customer.accessToken);
  const {
    body: { data: services },
  } = await api('get', '/services', customer.accessToken).expect(200);
  const serviceId = (code: string) =>
    services.find((item: { code: string }) => item.code === code).id;
  const date = future(120);
  const quote = (...codes: string[]) =>
    api('get', '/availability', customer.accessToken).query({
      vehicleId: car.id,
      date,
      serviceIds: codes.map(serviceId).join(','),
    });
  await quote('wax').expect(400);
  await quote('interior', 'wax').expect(400);
  const complete = (await quote('complete', 'wax').expect(200)).body.data;
  assert.equal(complete.totalCents, 4300000);
  assert.equal(complete.durationMinutes, 55);
  const upholstery = (await quote('upholstery').expect(200)).body.data;
  assert.equal(upholstery.totalCents, 2000000);
  assert.equal(upholstery.durationMinutes, 35);
  await api('post', '/appointments', customer.accessToken, {
    vehicleId: car.id,
    serviceIds: [serviceId('wax')],
    startsAt: complete.slots[0],
  }).expect(400);
});
