import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DateTime, Settings as Clock } from 'luxon';
import {
  canFit,
  assertWorkingTime,
  assertCompletionTime,
  businessWindow,
} from '../src/modules/appointments/schedule.js';
import { assertTransition } from '../src/modules/appointments/transitions.js';
import type { BusinessHour, Settings } from '../src/modules/settings/settings.repository.js';
test('capacidad considera máximos simultáneos y extremos exclusivos', () => {
  const existing = [
    { start: 0, end: 10, vehicleId: 'a', employeeId: null },
    { start: 10, end: 20, vehicleId: 'b', employeeId: null },
  ];
  assert.equal(canFit(0, 20, 2, existing), true);
  assert.equal(canFit(0, 20, 1, existing), false);
  assert.equal(canFit(20, 30, 1, existing), true);
});
test('mismo empleado o vehículo no se solapan aunque haya capacidad libre', () => {
  const existing = [{ start: 0, end: 10, vehicleId: 'a', employeeId: 'worker' }];
  assert.equal(canFit(0, 10, 3, existing, 'worker', 'b'), false);
  assert.equal(canFit(0, 10, 3, existing, null, 'a'), false);
});
test('empleado no salta estados y cliente solo cancela antes de iniciar', () => {
  assert.doesNotThrow(() => assertTransition('confirmed', 'in_progress', 'employee'));
  assert.throws(() => assertTransition('confirmed', 'completed', 'employee'));
  assert.throws(() => assertTransition('in_progress', 'cancelled', 'client'));
  assert.throws(() => assertTransition('pending', 'confirmed', 'client'));
});

test('jornada nocturna ofrece solo lavados completos dentro de 09:30–21:30 en Argentina', () => {
  const settings = {
    timeZone: 'America/Argentina/Buenos_Aires',
    slotStepMinutes: 5,
  } as Settings;
  const hours = [{ weekday: 1, opensAt: '09:30', closesAt: '21:30' }] as BusinessHour[];
  const date = DateTime.now()
    .setZone(settings.timeZone)
    .plus({ weeks: 2 })
    .startOf('week')
    .toISODate()!;
  const at = (time: string) => Date.parse(`${date}T${time}-03:00`);
  const window = businessWindow(date, settings, hours)!;
  assert.equal(window.open, at('09:30:00'));
  assert.equal(window.close, at('21:30:00'));
  assert.doesNotThrow(() =>
    assertWorkingTime(at('20:50:00'), at('21:30:00'), settings, hours),
  );
  assert.doesNotThrow(() =>
    assertWorkingTime(at('16:30:00'), at('17:10:00'), settings, hours),
  );
  for (const [start, end] of [
    ['09:25:00', '10:05:00'],
    ['20:55:00', '21:35:00'],
    ['21:30:00', '22:10:00'],
  ])
    assert.throws(() => assertWorkingTime(at(start!), at(end!), settings, hours));
});

test('se puede finalizar por la tarde/noche hasta el cierre y se rechaza fuera de la jornada', () => {
  const settings = { timeZone: 'America/Argentina/Buenos_Aires' } as Settings;
  const hours = [{ weekday: 1, opensAt: '09:30', closesAt: '21:30' }] as BusinessHour[];
  const original = Clock.now;
  try {
    for (const time of ['09:30:00', '16:30:00', '20:30:00', '21:29:59']) {
      Clock.now = () => Date.parse(`2026-11-16T${time}-03:00`);
      assert.doesNotThrow(() => assertCompletionTime(settings, hours), time);
    }
    for (const instant of [
      '2026-11-16T09:29:59-03:00',
      '2026-11-16T21:30:00-03:00',
      '2026-11-16T22:00:00-03:00',
      '2026-11-15T20:00:00-03:00',
    ]) {
      Clock.now = () => Date.parse(instant);
      assert.throws(() => assertCompletionTime(settings, hours), instant);
    }
  } finally {
    Clock.now = original;
  }
});
