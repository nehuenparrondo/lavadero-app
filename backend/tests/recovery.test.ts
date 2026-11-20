import { test } from 'node:test';
import assert from 'node:assert/strict';
import { recoveryExpired } from '../src/modules/auth/recovery.time.js';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../src/modules/auth/recovery.schema.js';
test('Recuperación interpreta UTC y rechaza fechas y tokens inválidos', () => {
  assert.equal(recoveryExpired('2000-01-01 00:00:00.000'), true);
  assert.equal(recoveryExpired('2099-01-01 00:00:00.000'), false);
  assert.equal(recoveryExpired('invalid'), true);
  assert.equal(
    resetPasswordSchema.safeParse({ token: 'a'.repeat(64), newPassword: 'x'.repeat(12) })
      .success,
    true,
  );
  assert.equal(
    resetPasswordSchema.safeParse({ token: 'a'.repeat(64), newPassword: '🔐'.repeat(20) })
      .success,
    false,
  );
  assert.equal(
    forgotPasswordSchema.safeParse({
      email: 'valid@example.invalid',
      redirect: 'https://evil.example',
    }).success,
    false,
  );
});
