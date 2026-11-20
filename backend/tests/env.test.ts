import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readEnv } from '../src/config/readEnv.js';

test('producción exige una base y TLS', () => {
  assert.throws(() => readEnv({ NODE_ENV: 'production' }), /Configuración inválida/);
  assert.throws(() => readEnv({ NODE_ENV: 'production', DATABASE_TLS: 'false' }));
});
test('admite CA pública del sistema y no imprime secretos al rechazar configuración', () => {
  assert.equal(readEnv({ DATABASE_URL: 'mysql://user:secret@host/db' }).DATABASE_TLS, 'true');
  assert.throws(
    () => readEnv({ DATABASE_URL: 'mysql://user:secret@host/db', PORT: 'invalid' }),
    (error: unknown) => {
      assert.ok(error instanceof Error);
      assert.ok(!error.message.includes('secret'));
      return true;
    },
  );
});
test('permite pruebas locales explícitas sin TLS y valida límites', () => {
  assert.equal(readEnv({ NODE_ENV: 'test', DATABASE_TLS: 'false' }).PORT, 3000);
  assert.throws(() => readEnv({ PORT: 'invalid' }));
  assert.throws(() => readEnv({ DATABASE_POOL_SIZE: '500' }));
});
