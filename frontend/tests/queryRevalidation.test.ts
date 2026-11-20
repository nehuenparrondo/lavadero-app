import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pendingQuery, failedQuery } from '../src/utils/queryLifecycle';

test('la recarga automática conserva listas y formularios sin spinner, también ante una caída', () => {
  const data = { items: [{ id: 'turno-confirmado' }] };
  const state = { key: 'agenda:hoy', data, loading: false, error: '' };
  const pending = pendingQuery(state, 'agenda:hoy', true);
  assert.equal(pending.loading, false);
  assert.equal(pending.data, data);
  const failed = failedQuery(pending, 'agenda:hoy', true, 'Sin conexión');
  assert.equal(failed.data, data);
  assert.equal(failed.error, 'Sin conexión');
  assert.equal(failed.loading, false);
  const different = pendingQuery(state, 'agenda:mañana', true);
  assert.equal(different.data, null);
  assert.equal(different.loading, true);
});
