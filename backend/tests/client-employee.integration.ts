import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { DateTime } from 'luxon';
import { rows, execute } from '../src/utils/db.js';
import {
  admin,
  api,
  atBusinessTime,
  client,
  employee,
  firstSlot,
  future,
  vehicle,
} from './support/context.js';

async function book(token: string, date: string) {
  const car = await vehicle(token);
  const { serviceId, quote } = await firstSlot(token, car.id, date);
  const booked = (
    await api('post', '/appointments', token, {
      vehicleId: car.id,
      serviceIds: [serviceId],
      startsAt: quote.slots[0],
    }).expect(201)
  ).body.data;
  return { ...booked, car };
}
const query = (token: string, params: Record<string, string>) =>
  api('get', '/appointments', token)
    .query({ ...params, limit: 100 })
    .expect(200);
const ids = (response: { body: { data: { items: { id: string }[] } } }) =>
  response.body.data.items.map((v) => v.id);

test('Próximos excluye días anteriores y no confirmados; limpiar Inicio conserva turnos y privacidad', async () => {
  const owner = await admin(),
    a = await client(),
    b = await client(),
    staff = await employee(owner.accessToken);
  const date = future(320),
    next = future(322),
    previous = DateTime.fromISO(date).minus({ days: 1 }).toISODate()!;
  // El día previo puede ser domingo: usamos un día laboral anterior conocido.
  const oldDate =
    DateTime.fromISO(previous).weekday === 7
      ? DateTime.fromISO(previous).minus({ days: 1 }).toISODate()!
      : previous;
  const old = await book(a.accessToken, oldDate),
    now = await book(a.accessToken, date),
    later = await book(a.accessToken, next);
  const pending = await book(a.accessToken, next),
    cancelled = await book(a.accessToken, next),
    other = await book(b.accessToken, next);
  await execute(
    "UPDATE turnos SET status_id=(SELECT id FROM estados_turno WHERE code='pending') WHERE id=?",
    [pending.id],
  );
  await api('post', `/appointments/${cancelled.id}/cancel`, owner.accessToken, {
    reason: 'Caso descartado en QA.',
  }).expect(200);
  await atBusinessTime(date + 'T12:00:00-03:00', async () => {
    assert.deepEqual(
      new Set(ids(await query(a.accessToken, { history: 'false' }))),
      new Set([now.id, later.id]),
    );
    const past = ids(await query(a.accessToken, { history: 'true' }));
    assert.ok(past.includes(old.id));
    assert.ok(past.includes(cancelled.id));
    await api('post', '/appointments/home-clear', staff.accessToken).expect(403);
    await api('post', '/appointments/home-clear', owner.accessToken).expect(403);
    await api('post', '/appointments/home-clear', a.accessToken, {
      clientId: b.user.id,
    }).expect(200);
    assert.deepEqual(ids(await query(a.accessToken, { history: 'false', home: 'true' })), []);
    assert.deepEqual(
      new Set(ids(await query(a.accessToken, { history: 'false' }))),
      new Set([now.id, later.id]),
    );
    assert.ok(
      ids(await query(b.accessToken, { history: 'false', home: 'true' })).includes(other.id),
    );
    const saved = (await api('get', '/appointments/' + now.id, owner.accessToken).expect(200))
      .body.data;
    assert.equal(saved.status, 'confirmed');
    const fresh = await book(a.accessToken, future(325));
    assert.deepEqual(ids(await query(a.accessToken, { history: 'false', home: 'true' })), [
      fresh.id,
    ]);
  });
  const stored = await rows('SELECT home_hidden_at hiddenAt FROM turnos WHERE id=?', [now.id]);
  assert.ok(stored[0]?.hiddenAt);
});

test('Hoy usa fecha argentina del servidor; cobro completo permite finalizar sin revisión y sin duplicados', async () => {
  const owner = await admin(),
    customer = await client(),
    staff = await employee(owner.accessToken, true),
    peer = await employee(owner.accessToken, true);
  const date = future(340),
    futureDate = future(342);
  const current = await book(customer.accessToken, date),
    following = await book(customer.accessToken, futureDate),
    base = '/appointments/' + current.id;
  await api('patch', base + '/assignment', owner.accessToken, {
    employeeId: staff.user.id,
  }).expect(200);
  await atBusinessTime(date + 'T10:00:00-03:00', async () => {
    const todayIds = ids(await query(staff.accessToken, { scope: 'today', date: futureDate }));
    assert.ok(todayIds.includes(current.id));
    assert.ok(!todayIds.includes(following.id));
    assert.ok(
      ids(
        await query(staff.accessToken, { scope: 'all', history: 'true', date: futureDate }),
      ).includes(following.id),
    );
  });
  await api('patch', base + '/status', staff.accessToken, { status: 'in_progress' }).expect(
    200,
  );
  const finish = { description: 'Lavado exterior, llantas y secado manual realizados.' };
  await api('post', base + '/finish', customer.accessToken, finish).expect(403);
  await api('post', base + '/finish', owner.accessToken, finish).expect(403);
  await api('post', base + '/finish', peer.accessToken, finish).expect(403);
  await api('post', base + '/finish', staff.accessToken, { description: '   ' }).expect(400);
  await atBusinessTime(date + 'T10:00:00-03:00', () =>
    api('post', base + '/finish', staff.accessToken, finish).expect(409),
  );
  const pay = (amountCents: number) =>
    api('post', base + '/payments', staff.accessToken, {
      amountCents,
      method: 'cash',
      idempotencyKey: randomUUID(),
    }).expect(201);
  await pay(100);
  await atBusinessTime(date + 'T10:00:00-03:00', () =>
    api('post', base + '/finish', staff.accessToken, finish).expect(409),
  );
  await pay(current.totalCents - 100);
  await atBusinessTime(date + 'T16:30:00-03:00', () =>
    api('post', base + '/finish', staff.accessToken, finish).expect(409),
  );
  await atBusinessTime('2027-11-14T12:00:00-03:00', () =>
    api('post', base + '/finish', staff.accessToken, finish).expect(409),
  );
  assert.equal(
    (await api('get', base, owner.accessToken).expect(200)).body.data.status,
    'in_progress',
  );
  await atBusinessTime(date + 'T10:00:00-03:00', () =>
    Promise.all(
      [1, 2].map(() => api('post', base + '/finish', staff.accessToken, finish).expect(200)),
    ),
  );
  const completed = (await api('get', base, customer.accessToken).expect(200)).body.data;
  assert.equal(completed.status, 'completed');
  assert.equal(completed.wash.completedByEmployee, true);
  assert.equal(completed.wash.decision, null);
  assert.equal(completed.wash.description, finish.description);
  assert.ok(completed.wash.employeeName);
  const work = await rows(
    'SELECT completed_by_employee direct,reviewed_by_id reviewer FROM partes_lavado WHERE appointment_id=?',
    [current.id],
  );
  assert.equal(work.length, 1);
  assert.equal(work[0]?.direct, 1);
  assert.equal(work[0]?.reviewer, null);
  const history = await rows(
    "SELECT COUNT(*) n FROM historial_estados_turno h JOIN estados_turno s ON s.id=h.status_id WHERE h.appointment_id=? AND s.code='completed'",
    [current.id],
  );
  assert.equal(Number(history[0]?.n), 1);
  await atBusinessTime(date + 'T12:00:00-03:00', async () => {
    assert.ok(!ids(await query(staff.accessToken, { scope: 'today' })).includes(current.id));
    assert.ok(
      ids(await query(staff.accessToken, { scope: 'all', date })).includes(current.id),
    );
  });
  await api('get', base + '/receipt', customer.accessToken).expect(200);
  await api('post', '/customer-messages', customer.accessToken, {
    kind: 'feedback',
    body: 'Buen resultado.',
    appointmentId: current.id,
  }).expect(201);
  const inbox = (
    await api('get', '/customer-messages', owner.accessToken)
      .query({ state: 'open', limit: 100 })
      .expect(200)
  ).body.data;
  const feedback = inbox.items.find(
    (m: { appointmentId: string }) => m.appointmentId === current.id,
  );
  assert.equal(feedback.workDescription, finish.description);
});

test('reclamo persistido aparece en pendientes del administrador, sin caché y con respuesta privada', async () => {
  const owner = await admin(),
    customer = await client(),
    other = await client(),
    staff = await employee(owner.accessToken);
  const body = "El turno de mi auto necesita atención. Referencia QA 🚗 'puerta'.";
  const sent = (
    await api('post', '/customer-messages', customer.accessToken, {
      kind: 'complaint',
      body,
    }).expect(201)
  ).body.data;
  const inbox = (
    await api('get', '/customer-messages', owner.accessToken)
      .query({ state: 'open', limit: 100 })
      .expect(200)
      .expect('Cache-Control', 'no-store')
  ).body.data;
  assert.ok(
    inbox.items.some((m: { id: string; body: string }) => m.id === sent.id && m.body === body),
  );
  const stored = await rows(
    'SELECT body,CAST(client_id AS CHAR) clientId FROM mensajes_cliente WHERE id=?',
    [sent.id],
  );
  assert.equal(stored[0]?.body, body);
  assert.equal(stored[0]?.clientId, customer.user.id);
  assert.equal(
    (await api('get', '/customer-messages', other.accessToken).expect(200)).body.data.total,
    0,
  );
  await api('get', '/customer-messages', staff.accessToken).expect(403);
  await api('patch', '/customer-messages/' + sent.id + '/reply', owner.accessToken, {
    reply: 'Lo vamos a coordinar por este medio.',
  }).expect(200);
  const replies = (
    await api('get', '/customer-messages', customer.accessToken)
      .query({ state: 'resolved' })
      .expect(200)
  ).body.data;
  assert.equal(replies.items[0].reply, 'Lo vamos a coordinar por este medio.');
});
