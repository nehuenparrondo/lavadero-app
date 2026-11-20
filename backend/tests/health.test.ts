import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp({ origins: ['https://app.example.com'], checkDatabase: async () => {} });
test('liveness no expone infraestructura ni credenciales', async () => {
  const result = await request(app).get('/health').expect(200);
  assert.deepEqual(result.body, { status: 'ok', service: 'lavadero-api', version: '1.0.0' });
  assert.equal(result.headers['x-powered-by'], undefined);
});
test('readiness propaga caída MySQL como 503', async () => {
  const down = createApp({
    origins: [],
    checkDatabase: async () => {
      throw new Error('secret');
    },
  });
  const result = await request(down).get('/ready').expect(503);
  assert.deepEqual(result.body, { status: 'not_ready', database: 'down' });
});
test('readiness responde 200 si MySQL está disponible', async () => {
  await request(app).get('/ready').expect(200);
});
test('CORS rechaza un origen ajeno y acepta el origen configurado', async () => {
  await request(app).get('/health').set('Origin', 'https://evil.example').expect(403);
  const result = await request(app).get('/health').set('Origin', 'https://app.example.com');
  assert.equal(result.headers['access-control-allow-origin'], 'https://app.example.com');
});
test('recursos desconocidos responden un error uniforme', async () => {
  const result = await request(app).get('/api/v1/nonexistent-resource').expect(404);
  assert.equal(result.body.error.code, 'NOT_FOUND');
});
test('Swagger y su contrato son accesibles sin app móvil', async () => {
  await request(app).get('/api/docs/').expect(200);
  const result = await request(app).get('/api/openapi.json').expect(200);
  assert.equal(result.body.openapi, '3.1.0');
});
test('JSON mal formado devuelve 400', async () => {
  await request(app)
    .post('/api/v1')
    .set('Content-Type', 'application/json')
    .send('{')
    .expect(400);
});
test('Entradas grandes y propiedades de prototipo se rechazan sin filtrar el body', async () => {
  const large = await request(app)
    .post('/api/v1/auth/login')
    .send({ email: 'a@example.invalid', password: 'x'.repeat(34000) })
    .expect(413);
  assert.equal(large.body.error.code, 'BODY_TOO_LARGE');
  const invalid = await request(app)
    .post('/api/v1/auth/login')
    .set('Content-Type', 'application/json')
    .send('{"email":"a@example.invalid","password":"a","__proto__":{"isAdmin":true}}')
    .expect(400);
  assert.equal(invalid.body.error.code, 'VALIDATION_ERROR');
  assert.equal(Object.prototype.hasOwnProperty.call(Object.prototype, 'isAdmin'), false);
});
test('Helmet protege el contenido y no expone la tecnología del servidor', async () => {
  const result = await request(app).get('/health').expect(200);
  assert.equal(result.headers['x-content-type-options'], 'nosniff');
  assert.equal(result.headers['x-frame-options'], 'SAMEORIGIN');
  assert.ok(result.headers['content-security-policy']?.includes("object-src 'none'"));
  assert.equal(result.headers['x-powered-by'], undefined);
});
