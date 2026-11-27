import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomInt, randomUUID } from 'node:crypto';
import { DateTime } from 'luxon';
import {
  admin,
  api,
  atBusinessTime,
  client,
  employee,
  future,
  vehicle,
} from './support/context.js';

const zone = 'America/Argentina/Buenos_Aires';
const day = () => future(650 + randomInt(2000));
const instant = (date: string, time: string) => `${date}T${time}-03:00`;

async function catalog(token: string) {
  const types = (await api('get', '/vehicle-types', token).expect(200)).body.data;
  const services = (await api('get', '/services', token).expect(200)).body.data;
  return {
    typeId: types.find((v: { code: string }) => v.code === 'car').id as string,
    ids: (...codes: string[]) =>
      codes.map(
        (code) => services.find((s: { code: string }) => s.code === code).id as string,
      ),
  };
}

test('disponibilidad nocturna respeta duración, extras, días cerrados e inicio único', async () => {
  const manager = await admin();
  const customer = await client();
  const outsider = await client();
  const c = await catalog(customer.accessToken);
  const date = day();
  const settings = (await api('get', '/settings', manager.accessToken).expect(200)).body.data;
  for (const h of settings.hours) {
    assert.equal(h.opensAt.slice(0, 5), '09:30');
    assert.equal(h.closesAt.slice(0, 5), '21:30');
  }
  for (const codes of [
    ['interior'],
    ['exterior'],
    ['complete'],
    ['complete', 'wax', 'upholstery'],
  ]) {
    const quote = (
      await api('get', '/availability', customer.accessToken)
        .query({ date, vehicleTypeId: c.typeId, serviceIds: c.ids(...codes).join(',') })
        .expect(200)
    ).body.data;
    assert.ok(quote.slots.length);
    assert.ok(
      quote.slots.some((slot: string) => DateTime.fromISO(slot).setZone(zone).hour >= 20),
    );
    for (const slot of quote.slots) {
      const start = DateTime.fromISO(slot).setZone(zone);
      const end = start.plus({ minutes: quote.durationMinutes });
      assert.equal(start.toISODate(), date);
      assert.ok(start.toFormat('HH:mm') >= '09:30');
      assert.ok(end.toISODate() === date && end.toFormat('HH:mm:ss') <= '21:30:00');
    }
    const last = DateTime.fromISO(quote.slots.at(-1)).setZone(zone);
    assert.equal(last.plus({ minutes: quote.durationMinutes }).toFormat('HH:mm'), '21:30');
  }
  const body = { vehicleTypeId: c.typeId, serviceIds: c.ids('complete') };
  for (const time of ['09:25:00', '20:55:00', '21:30:00', '22:00:00'])
    await api('post', '/appointments', customer.accessToken, {
      ...body,
      startsAt: instant(date, time),
    }).expect(409);
  const responses = await Promise.all(
    [customer, outsider].map((s) =>
      api('post', '/appointments', s.accessToken, {
        ...body,
        startsAt: instant(date, '20:50:00'),
      }),
    ),
  );
  assert.deepEqual(responses.map((r) => r.status).sort(), [201, 409]);
  const winner = responses[0]!.status === 201 ? customer : outsider;
  const booked = responses.find((r) => r.status === 201)!.body.data;
  assert.equal(DateTime.fromISO(booked.endsAt).setZone(zone).toFormat('HH:mm'), '21:30');
  await api('post', `/appointments/${booked.id}/cancel`, winner.accessToken, {
    reason: 'Fin de prueba nocturna QA.',
  }).expect(200);
  const sunday = DateTime.fromISO(date).startOf('week').plus({ days: 6 }).toISODate()!;
  const closed = (
    await api('get', '/availability', customer.accessToken)
      .query({
        date: sunday,
        vehicleTypeId: c.typeId,
        serviceIds: c.ids('complete').join(','),
      })
      .expect(200)
  ).body.data;
  assert.deepEqual(closed.slots, []);
});

test('finalización y fichaje admiten la noche y bloquean apertura, cierre y día no laboral', async () => {
  const manager = await admin();
  const customer = await client();
  const staff = await employee(manager.accessToken, true);
  const car = await vehicle(customer.accessToken);
  const c = await catalog(customer.accessToken);
  const date = day();
  const booked = (
    await api('post', '/appointments', customer.accessToken, {
      vehicleId: car.id,
      serviceIds: c.ids('exterior'),
      startsAt: instant(date, '20:55:00'),
    }).expect(201)
  ).body.data;
  const path = `/appointments/${booked.id}`;
  await api('patch', path + '/assignment', manager.accessToken, {
    employeeId: staff.user.id,
  }).expect(200);
  await atBusinessTime(instant(date, '20:55:00'), () =>
    api('patch', path + '/status', staff.accessToken, { status: 'in_progress' }).expect(200),
  );
  await api('post', path + '/payments', staff.accessToken, {
    amountCents: booked.totalCents,
    method: 'cash',
    idempotencyKey: randomUUID(),
  }).expect(201);
  const sunday = DateTime.fromISO(date).startOf('week').plus({ days: 6 }).toISODate()!;
  const finish = {
    description:
      'Prueba QA: lavado exterior y secado completados durante la jornada nocturna.',
  };
  for (const at of [
    instant(date, '09:29:59'),
    instant(date, '21:30:00'),
    instant(date, '22:00:00'),
    instant(sunday, '20:00:00'),
  ]) {
    await atBusinessTime(at, async () => {
      const rejected = await api('post', path + '/finish', staff.accessToken, finish).expect(
        409,
      );
      assert.equal(rejected.body.error.code, 'OUTSIDE_BUSINESS_HOURS');
      await api('post', `/attendance/${staff.user.id}/arrival`, manager.accessToken, {
        date: at.slice(0, 10),
      }).expect(409);
    });
  }
  await atBusinessTime(instant(date, '16:30:00'), async () => {
    assert.equal(
      (await api('get', '/attendance', manager.accessToken).expect(200)).body.data.canRecord,
      true,
    );
  });
  await atBusinessTime(instant(date, '21:29:59'), async () => {
    await api('post', path + '/finish', staff.accessToken, finish).expect(200);
    await api('post', `/attendance/${staff.user.id}/arrival`, manager.accessToken, {
      date,
    }).expect(200);
  });
  assert.equal(
    (await api('get', path, manager.accessToken).expect(200)).body.data.status,
    'completed',
  );
});

test('auto sin turno entra hasta el último inicio que permite terminar a las 21:30', async () => {
  const manager = await admin();
  const c = await catalog(manager.accessToken);
  const date = day();
  const input = () => ({
    requestId: randomUUID(),
    plate: randomUUID().replaceAll('-', '').slice(0, 12),
    vehicleTypeId: c.typeId,
    serviceIds: c.ids('complete'),
  });
  const booked = (
    await atBusinessTime(instant(date, '20:50:00'), () =>
      api('post', '/appointments/walk-in', manager.accessToken, input()).expect(201),
    )
  ).body.data;
  assert.equal(DateTime.fromISO(booked.endsAt).setZone(zone).toFormat('HH:mm'), '21:30');
  for (const time of ['20:55:00', '21:30:00', '22:00:00'])
    await atBusinessTime(instant(date, time), () =>
      api('post', '/appointments/walk-in', manager.accessToken, input()).expect(409),
    );
  await api('post', `/appointments/${booked.id}/cancel`, manager.accessToken, {
    reason: 'Fin de prueba de ingreso nocturno QA.',
  }).expect(200);
});
