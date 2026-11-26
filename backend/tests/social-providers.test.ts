import { afterEach, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { authEnv } from '../src/config/authEnv.js';
import { getProvider, providerAvailability } from '../src/config/oauth.js';
const original = { ...authEnv };
beforeEach(() => {
  authEnv.PUBLIC_API_URL = 'https://api.example.invalid';
  for (const prefix of ['GOOGLE', 'DISCORD', 'GITHUB'] as const) {
    authEnv[`${prefix}_CLIENT_ID`] = 'fixture-id';
    authEnv[`${prefix}_CLIENT_SECRET`] = 'fixture-secret';
  }
});
afterEach(() => Object.assign(authEnv, original));

test('Google, Discord y GitHub se habilitan por configuración sin revelar credenciales', () => {
  const rows = providerAvailability();
  assert.deepEqual(
    rows.map((row) => row.provider),
    ['google', 'github', 'discord'],
  );
  for (const row of rows) {
    assert.equal(row.enabled, true);
    assert.deepEqual(Object.keys(row).sort(), ['enabled', 'provider']);
    const config = getProvider(row.provider as 'google' | 'github' | 'discord');
    assert.equal(config.pkce, true);
    assert.equal(
      config.callback,
      `https://api.example.invalid/api/v1/auth/oauth/${row.provider}/callback`,
    );
    assert.ok(!config.scope.includes('repo'));
    assert.ok(!config.scope.includes('guilds'));
  }
});

test('un proveedor sin secreto no se anuncia disponible ni inicia el flujo', () => {
  authEnv.DISCORD_CLIENT_SECRET = '';
  assert.equal(
    providerAvailability().find((row) => row.provider === 'discord')?.enabled,
    false,
  );
  assert.equal(providerAvailability().find((row) => row.provider === 'github')?.enabled, true);
  assert.throws(() => getProvider('discord'), { code: 'OAUTH_NOT_CONFIGURED', status: 503 });
});
