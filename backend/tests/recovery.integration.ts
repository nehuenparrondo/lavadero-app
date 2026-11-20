import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { api, client, testPassword } from './support/context.js';
import { database } from '../src/config/database.js';
import { dispatchRecovery } from '../src/modules/auth/recovery.delivery.js';
import { enqueueRecovery } from '../src/modules/auth/recovery.queue.repository.js';
import { resetPassword } from '../src/modules/auth/recovery.service.js';
import { tokenHash } from '../src/modules/auth/token.service.js';

const newPassword = 'Recuperacion-Segura!2026';
async function deliver(email: string) {
  await enqueueRecovery(email);
  let token = '';
  for (let i = 0; i < 15 && !token; i++) {
    if (
      !(await dispatchRecovery(async (to, url) => {
        if (to === email)
          token = new URLSearchParams(new URL(url).hash.slice(1)).get('token')!;
      }))
    )
      break;
  }
  assert.match(token, /^[a-f0-9]{64}$/u);
  return token;
}

test('Recuperación: respuesta idéntica, cola privada y correo inexistente descartado', async () => {
  const existing = await client();
  const absent = `ausente-${randomUUID()}@example.invalid`;
  const known = await api('post', '/auth/forgot-password', undefined, {
    email: existing.user.email,
  }).expect(202);
  const unknown = await api('post', '/auth/forgot-password', undefined, {
    email: absent,
  }).expect(202);
  assert.deepEqual(known.body, unknown.body);
  assert.equal(known.headers['cache-control'], 'no-store');
  const addresses: string[] = [];
  for (let i = 0; i < 5; i++)
    if (
      !(await dispatchRecovery(async (to) => {
        addresses.push(to);
      }))
    )
      break;
  assert.ok(addresses.includes(existing.user.email));
  assert.ok(!addresses.includes(absent));
});

test('Recuperación: token hash, un uso concurrente y revocación de JWT y refresh', async () => {
  const existing = await client();
  const token = await deliver(existing.user.email);
  const [rows] = await database!.query(
    'SELECT token_hash,nonce,TIMESTAMPDIFF(SECOND,UTC_TIMESTAMP(3),vence_en) seconds FROM recuperaciones_clave WHERE token_hash=?',
    [tokenHash(token)],
  );
  const row = (rows as { token_hash: Buffer; nonce: Buffer; seconds: number }[])[0]!;
  assert.notEqual(row.token_hash.toString('hex'), token);
  assert.equal(row.nonce.length, 32);
  assert.ok(row.seconds > 800 && row.seconds <= 900);
  const results = await Promise.allSettled([
    resetPassword({ token, newPassword }),
    resetPassword({ token, newPassword }),
  ]);
  assert.equal(results.filter((result) => result.status === 'fulfilled').length, 1);
  await assert.rejects(resetPassword({ token, newPassword }));
  await api('get', '/users/me', existing.accessToken).expect(401);
  await api('post', '/auth/refresh', undefined, {
    refreshToken: existing.refreshToken,
  }).expect(401);
  await api('post', '/auth/login', undefined, {
    email: existing.user.email,
    password: testPassword,
  }).expect(401);
  const login = await api('post', '/auth/login', undefined, {
    email: existing.user.email,
    password: newPassword,
  }).expect(200);
  assert.equal(login.body.data.user.id, existing.user.id);
  assert.equal(login.body.data.user.role, 'client');
});

test('Recuperación: vencimiento, versión anterior y cuenta desactivada no cambian la clave', async () => {
  const existing = await client();
  const expired = await deliver(existing.user.email);
  await database!.execute(
    'UPDATE recuperaciones_clave SET vence_en=DATE_SUB(UTC_TIMESTAMP(3),INTERVAL 1 SECOND) WHERE token_hash=?',
    [tokenHash(expired)],
  );
  await assert.rejects(resetPassword({ token: expired, newPassword }));
  const stale = await deliver(existing.user.email);
  await database!.execute('UPDATE usuarios SET auth_version=auth_version+1 WHERE id=?', [
    existing.user.id,
  ]);
  await assert.rejects(resetPassword({ token: stale, newPassword }));
  const disabled = await deliver(existing.user.email);
  await database!.execute('UPDATE usuarios SET is_active=FALSE WHERE id=?', [
    existing.user.id,
  ]);
  await assert.rejects(resetPassword({ token: disabled, newPassword }));
});

test('Recuperación: límite por correo atómico, fallos reintentables y sin enlace arbitrario', async () => {
  const existing = await client();
  await Promise.all(Array.from({ length: 6 }, () => enqueueRecovery(existing.user.email)));
  const [jobs] = await database!.query(
    'SELECT COUNT(*) count FROM recuperaciones_clave WHERE correo=?',
    [existing.user.email],
  );
  assert.equal(Number((jobs as { count: number }[])[0]!.count), 3);
  await dispatchRecovery(async () => {
    throw new Error('secreto remoto que no debe persistirse');
  });
  const [failures] = await database!.query(
    'SELECT ultimo_error FROM recuperaciones_clave WHERE correo=? AND ultimo_error IS NOT NULL',
    [existing.user.email],
  );
  assert.equal((failures as { ultimo_error: string }[])[0]?.ultimo_error, 'DELIVERY_FAILED');
  await api('post', '/auth/forgot-password', undefined, {
    email: existing.user.email,
    redirect: 'https://evil.example',
  }).expect(400);
  await api('post', '/auth/reset-password', undefined, { token: 'x', newPassword }).expect(
    400,
  );
});

test('Discord y GitHub están retirados también por sus endpoints antiguos', async () => {
  for (const provider of ['github', 'discord']) {
    await api('post', `/auth/oauth/${provider}/start`, undefined, {
      redirect_uri: 'lavadero://oauth',
      state: 'a'.repeat(32),
      code_challenge: 'a'.repeat(43),
      code_challenge_method: 'S256',
      response_type: 'code',
    }).expect(410);
    await api('get', `/auth/oauth/${provider}/callback`)
      .query({ state: 'a'.repeat(64), code: 'fake' })
      .expect(410);
  }
  const providers = await api('get', '/auth/providers').expect(200);
  assert.deepEqual(
    providers.body.data
      .filter((p: { enabled: boolean }) => p.enabled)
      .map((p: { provider: string }) => p.provider),
    ['google'],
  );
});

test('Perfil rechaza fotos y privilegios; SQL malicioso no autentica ni altera tablas', async () => {
  const existing = await client();
  await api('patch', '/users/me', existing.accessToken, {
    avatarUrl: 'https://evil.example/photo',
  }).expect(400);
  await api('patch', '/users/me', existing.accessToken, { role: 'admin' }).expect(400);
  await api('post', '/auth/login', undefined, {
    email: "' OR 1=1 --@example.invalid",
    password: testPassword,
  }).expect(400);
  await api('post', '/auth/login', undefined, {
    email: existing.user.email,
    password: "' OR 1=1; DROP TABLE usuarios; --",
  }).expect(401);
  const text = "<img src=x onerror=alert(1)> ' ; DROP TABLE usuarios; --";
  const saved = await api('patch', '/users/me', existing.accessToken, {
    firstName: text,
  }).expect(200);
  assert.equal(saved.body.data.firstName, text);
  await api('get', '/users/me', existing.accessToken).expect(200);
});
