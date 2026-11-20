import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canFit } from '../src/modules/appointments/schedule.js';
import { assertTransition } from '../src/modules/appointments/transitions.js';
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
