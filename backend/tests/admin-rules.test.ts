import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Settings as Clock } from 'luxon';
import { attendanceWindow } from '../src/modules/attendance/attendance.window.js';
import { reportWeeks } from '../src/modules/reports/reportWeeks.js';
import { createUserSchema, adminPatchSchema } from '../src/modules/users/users.schema.js';
import type { Settings, BusinessHour } from '../src/modules/settings/settings.repository.js';
import { appointmentQuerySchema } from '../src/modules/appointments/appointments.schema.js';
import { agendaScope } from '../src/modules/appointments/agendaScope.repository.js';

test('semanas ISO conservan centavos, ceros y límites de año/período', () => {
  const weeks = reportWeeks([
    { date: '2026-12-31', revenueCents: 10001, washes: 1 },
    { date: '2027-01-01', revenueCents: 29999, washes: 2 },
    { date: '2027-01-03', revenueCents: 0, washes: 0 },
    { date: '2027-01-04', revenueCents: 0, washes: 0 },
  ]);
  assert.deepEqual(weeks, [
    { from: '2026-12-31', to: '2027-01-03', revenueCents: 40000, washes: 3 },
    { from: '2027-01-04', to: '2027-01-04', revenueCents: 0, washes: 0 },
  ]);
  assert.deepEqual(reportWeeks([]), []);
});

test('asistencia respeta zona argentina, apertura incluida y cierre excluido', () => {
  const settings = { timeZone: 'America/Argentina/Buenos_Aires' } as Settings;
  const hours = [1, 2, 3, 4, 5, 6].map((weekday) => ({
    weekday,
    opensAt: '09:30',
    closesAt: '21:30',
  })) as BusinessHour[];
  const original = Clock.now;
  try {
    for (const [instant, allowed] of [
      ['2026-11-16T12:29:59Z', false],
      ['2026-11-16T12:30:00Z', true],
      ['2026-11-16T19:29:59Z', true],
      ['2026-11-16T19:30:00Z', true],
      ['2026-11-17T00:29:59Z', true],
      ['2026-11-17T00:30:00Z', false],
      ['2026-11-15T15:00:00Z', false],
    ] as const) {
      Clock.now = () => Date.parse(instant);
      const state = attendanceWindow(settings, hours);
      assert.equal(state.canRecord, allowed, instant);
      assert.equal(Boolean(state.recordReason), !allowed);
    }
    Clock.now = () => Date.parse('2026-11-16T01:30:00Z');
    assert.equal(attendanceWindow(settings, hours).today, '2026-11-15');
  } finally {
    Clock.now = original;
  }
});

test('alta solo cliente/empleado y edición sin rol', () => {
  const account = {
    email: 'rules@example.invalid',
    password: 'Academic-Local-Test!2026',
    firstName: 'Nombre',
    lastName: 'Apellido',
  };
  for (const role of ['client', 'employee'])
    assert.equal(createUserSchema.safeParse({ ...account, role }).success, true);
  assert.equal(createUserSchema.safeParse({ ...account, role: 'admin' }).success, false);
  assert.equal(adminPatchSchema.safeParse({ role: 'employee' }).success, false);
});

test('pendientes administrativos comienzan al inicio del día argentino, también al cambiar UTC', () => {
  const actor = { id: '1', role: 'admin' as const, authVersion: 1, canRecordPayments: true };
  const query = appointmentQuerySchema.parse({ queue: 'requested' });
  const original = Clock.now;
  try {
    Clock.now = () => Date.parse('2026-11-28T02:30:00Z');
    assert.deepEqual(agendaScope(actor, query, 'America/Argentina/Buenos_Aires'), {
      conditions: ['a.starts_at>=?'],
      values: ['2026-11-27 03:00:00.000'],
    });
    Clock.now = () => Date.parse('2026-11-28T03:00:00Z');
    assert.deepEqual(agendaScope(actor, query, 'America/Argentina/Buenos_Aires').values, [
      '2026-11-28 03:00:00.000',
    ]);
    assert.deepEqual(agendaScope(actor, appointmentQuerySchema.parse({}), 'UTC'), {
      conditions: [],
      values: [],
    });
  } finally {
    Clock.now = original;
  }
});
