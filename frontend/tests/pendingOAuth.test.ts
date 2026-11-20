import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readPendingOAuth } from '../src/utils/pendingOAuth';
const state = '26a30e4d-ae5e-49a1-9c6d-8fe27db47a13';
const raw = JSON.stringify({ state, verifier: 'v'.repeat(64), createdAt: 1000 });
test('retorno OAuth exige el state de la misma pestaña y un PKCE válido', () => {
  assert.equal(readPendingOAuth(raw, state, 2000).verifier.length, 64);
  assert.throws(() => readPendingOAuth(raw, 'otro-estado', 2000));
  assert.throws(() => readPendingOAuth(null, state, 2000));
  assert.throws(() => readPendingOAuth('{', state, 2000));
});
test('solicitud OAuth vence exactamente a los diez minutos y rechaza relojes anteriores', () => {
  assert.doesNotThrow(() => readPendingOAuth(raw, state, 600999));
  assert.throws(() => readPendingOAuth(raw, state, 601000));
  assert.throws(() => readPendingOAuth(raw, state, 999));
});
