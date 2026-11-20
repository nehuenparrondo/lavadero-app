import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { api, client, testPassword } from './support/context.js';
import { database } from '../src/config/database.js';
import { pkceChallenge } from '../src/modules/auth/pkce.js';

for (const locked of [false, true])
  test(`Vinculación local: ${locked ? 'bloqueo al quinto intento' : 'prueba de contraseña y sesión del mismo usuario'}`, async (t) => {
    const existing = await client();
    const subject = randomUUID();
    t.mock.method(
      globalThis,
      'fetch',
      async (input: RequestInfo | URL) =>
        new Response(
          JSON.stringify(
            String(input).includes('token')
              ? { access_token: 'mock-provider-token' }
              : {
                  sub: subject,
                  email: existing.user.email,
                  email_verified: true,
                  given_name: 'Social',
                },
          ),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        ),
    );
    const verifier = 'a'.repeat(64);
    const start = await api('get', '/auth/oauth/google/authorize')
      .query({
        redirect_uri: 'lavadero://oauth',
        state: randomUUID(),
        code_challenge: pkceChallenge(verifier),
        code_challenge_method: 'S256',
        response_type: 'code',
      })
      .expect(302);
    const state = new URL(start.headers.location!).searchParams.get('state')!;
    const callback = await api('get', '/auth/oauth/google/callback')
      .query({ state, code: 'provider-code' })
      .expect(302);
    const code = new URL(callback.headers.location!).searchParams.get('code')!;
    const body = { code, codeVerifier: verifier };
    const required = await api('post', '/auth/oauth/exchange', undefined, body).expect(409);
    assert.equal(required.body.error.code, 'OAUTH_LINK_REQUIRED');
    const [before] = await database!.query(
      'SELECT user_id FROM cuentas_sociales WHERE user_id=?',
      [existing.user.id],
    );
    assert.deepEqual(before, []);
    for (let attempt = 0; attempt < (locked ? 5 : 1); attempt++)
      await api('post', '/auth/oauth/exchange', undefined, {
        ...body,
        password: 'incorrecta',
      }).expect(401);
    const result = await api('post', '/auth/oauth/exchange', undefined, {
      ...body,
      password: testPassword,
    }).expect(locked ? 401 : 200);
    if (locked) assert.equal(result.body.error.code, 'OAUTH_LINK_LOCKED');
    else {
      assert.equal(result.body.data.user.id, existing.user.id);
      const [after] = await database!.query(
        'SELECT user_id FROM cuentas_sociales WHERE user_id=?',
        [existing.user.id],
      );
      assert.equal((after as unknown[]).length, 1);
      await api('post', '/auth/oauth/exchange', undefined, {
        ...body,
        password: testPassword,
      }).expect(401);
    }
    await api('get', '/users/me', existing.accessToken).expect(200);
  });

test('La base rechaza ambos casos de identidad social parcialmente nula', async () => {
  const existing = await client();
  for (const [provider, subject] of [
    [null, 'fixture'],
    ['google', null],
  ] as const) {
    await assert.rejects(
      database!.execute(
        `INSERT INTO autorizaciones_oauth(code_hash,user_id,code_challenge,expires_at,link_provider,link_subject)
         VALUES(UNHEX(SHA2(?,256)),?, ?,DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 1 MINUTE),?,?)`,
        [randomUUID(), existing.user.id, 'a'.repeat(43), provider, subject],
      ),
      (error: unknown) =>
        error instanceof Error &&
        'errno' in error &&
        [3819, 4025].includes(Number(error.errno)),
    );
  }
});
