import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { RowDataPacket } from 'mysql2/promise';
import { database } from '../src/config/database.js';
import {
  admin,
  api,
  client,
  employee,
  firstSlot,
  future,
  login,
  vehicle,
} from './support/context.js';

test('cancelación, observaciones y lectura se conservan en MariaDB con permisos por titular', async () => {
  const owner = await admin();
  const customer = await client();
  const outsider = await client();
  const staff = await employee(owner.accessToken);
  const car = await vehicle(customer.accessToken);
  const { serviceId, quote } = await firstSlot(customer.accessToken, car.id, future(141));
  const booked = (
    await api('post', '/appointments', customer.accessToken, {
      vehicleId: car.id,
      serviceIds: [serviceId],
      startsAt: quote.slots[0],
    }).expect(201)
  ).body.data;
  const path = '/appointments/' + booked.id;
  const detail = (token: string) => api('get', path, token).expect(200);
  const inbox = (token: string) =>
    api('get', '/appointments/cancellation-notices', token).expect(200);
  const note =
    "Rayón previo en puerta; revisar tapizado del conductor. No usar 'solvente'. 🚗";
  const reason =
    'Corte de agua en el lavadero. Podés reservar para mañana; disculpá la demora.';

  await api('get', '/appointments/cancellation-notices').expect(401);
  await api('get', '/appointments/cancellation-notices', owner.accessToken).expect(403);
  await api('get', '/appointments/cancellation-notices', staff.accessToken).expect(403);
  await api('post', path + '/notes', customer.accessToken, { body: note }).expect(403);
  await api('post', path + '/notes', owner.accessToken, { body: '   ' }).expect(400);
  await api('post', path + '/notes', owner.accessToken, {
    body: note,
    authorId: outsider.user.id,
  }).expect(400);
  await api('post', path + '/notes', owner.accessToken, { body: note }).expect(201);
  const observed = (await detail(customer.accessToken)).body.data.notes.at(-1);
  assert.equal(observed.body, note);
  assert.ok(observed.authorName);
  assert.match(observed.createdAt, /Z$/u);
  const [savedNotes] = await database!.query<RowDataPacket[]>(
    'SELECT body,CAST(author_id AS CHAR) author FROM notas_turno WHERE id=?',
    [observed.id],
  );
  assert.equal(savedNotes[0]?.body, note);
  assert.equal(savedNotes[0]?.author, owner.user.id);

  for (const body of [{}, { reason: '   ' }, { reason: 'x'.repeat(501) }])
    await api('post', path + '/cancel', owner.accessToken, body).expect(400);
  // El cambio genérico de estado tampoco puede omitir un motivo ni dejar historial parcial.
  await api('patch', path + '/status', owner.accessToken, { status: 'cancelled' }).expect(400);
  assert.equal((await detail(customer.accessToken)).body.data.status, 'confirmed');
  assert.deepEqual((await inbox(customer.accessToken)).body.data, []);

  await api('post', path + '/cancel', owner.accessToken, {
    reason: '  ' + reason + '  ',
  }).expect(200);
  const cancelled = (await detail(customer.accessToken)).body.data;
  assert.equal(cancelled.status, 'cancelled');
  assert.equal(cancelled.cancellationReason, reason);
  assert.ok(cancelled.cancelledByName);
  assert.equal(cancelled.notes.at(-1).body, note);
  const [stored] = await database!.query<RowDataPacket[]>(
    'SELECT cancellation_reason reason,CAST(cancelled_by_id AS CHAR) actor,cancellation_read_at readAt FROM turnos WHERE id=?',
    [booked.id],
  );
  assert.equal(stored[0]?.reason, reason);
  assert.equal(stored[0]?.actor, owner.user.id);
  assert.equal(stored[0]?.readAt, null);
  const [history] = await database!.query<RowDataPacket[]>(
    "SELECT COUNT(*) total FROM historial_estados_turno h JOIN estados_turno s ON s.id=h.status_id WHERE h.appointment_id=? AND s.code='cancelled'",
    [booked.id],
  );
  assert.equal(Number(history[0]?.total), 1);
  const notices = (await inbox(customer.accessToken)).body.data;
  assert.equal(notices.length, 1);
  assert.equal(notices[0].id, booked.id);
  assert.equal(notices[0].reason, reason);
  assert.equal(notices[0].plate, car.plate);
  assert.match(notices[0].startsAt, /Z$/u);
  assert.match(notices[0].cancelledAt, /Z$/u);
  assert.deepEqual((await inbox(outsider.accessToken)).body.data, []);
  await api('post', path + '/cancellation-read', outsider.accessToken).expect(404);
  await api('post', path + '/cancellation-read', staff.accessToken).expect(403);

  // Reingresar no borra ni marca el aviso; solo la acción explícita del titular lo hace.
  await api('post', '/auth/logout', undefined, { refreshToken: customer.refreshToken }).expect(
    200,
  );
  const again = await login(customer.user.email);
  assert.equal((await inbox(again.accessToken)).body.data[0].id, booked.id);
  await api('post', path + '/cancellation-read', again.accessToken).expect(200);
  await api('post', path + '/cancellation-read', again.accessToken).expect(200);
  assert.deepEqual((await inbox(again.accessToken)).body.data, []);
  const [read] = await database!.query<RowDataPacket[]>(
    'SELECT cancellation_read_at readAt,cancellation_reason reason FROM turnos WHERE id=?',
    [booked.id],
  );
  assert.ok(read[0]?.readAt);
  assert.equal(read[0]?.reason, reason);
  assert.equal((await detail(again.accessToken)).body.data.notes.at(-1).body, note);
});

test('una cancelación del propio cliente no genera un aviso del lavadero', async () => {
  const customer = await client();
  const car = await vehicle(customer.accessToken);
  const { serviceId, quote } = await firstSlot(customer.accessToken, car.id, future(142));
  const booked = (
    await api('post', '/appointments', customer.accessToken, {
      vehicleId: car.id,
      serviceIds: [serviceId],
      startsAt: quote.slots[0],
    }).expect(201)
  ).body.data;
  await api('post', `/appointments/${booked.id}/cancel`, customer.accessToken, {
    reason: 'No podré asistir.',
  }).expect(200);
  const notices = await api(
    'get',
    '/appointments/cancellation-notices',
    customer.accessToken,
  ).expect(200);
  assert.deepEqual(notices.body.data, []);
});
