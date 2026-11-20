import assert from 'node:assert/strict';
import { test } from 'node:test';
import { unavailableReason } from '../src/modules/appointments/availability.reason.js';
test('disponibilidad distingue cierre, jornada pasada, duración excesiva y cupos completos', () => {
  assert.equal(unavailableReason(null, 35, [], 100), 'closed');
  assert.equal(unavailableReason({ open: 0, close: 90 }, 35, [], 100), 'past');
  assert.equal(unavailableReason({ open: 0, close: 1800000 }, 40, [], 100), 'duration');
  assert.equal(unavailableReason({ open: 0, close: 3600000 }, 35, [], 100), 'full');
  assert.equal(unavailableReason({ open: 0, close: 3600000 }, 35, ['slot'], 100), null);
});
