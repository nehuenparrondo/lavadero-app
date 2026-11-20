import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';

test('la pausa de migración bloquea sesiones y mutaciones y conserva las sondas de salud', async () => {
  const app = createApp({ origins: [], checkDatabase: async () => {}, maintenance: true });
  await request(app).get('/ready').expect(200);
  const result = await request(app).post('/api/v1/auth/register').send({}).expect(503);
  assert.equal(result.body.error.code, 'MAINTENANCE');
  await request(app).get('/api/v1/appointments').expect(503);
});
