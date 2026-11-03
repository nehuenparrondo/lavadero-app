import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shouldOfferScrollTop } from '../src/utils/scrollVisibility';
import { profileDestination } from '../src/utils/profileDestination';
import { createRefreshGate } from '../src/utils/refreshGate';

test('volver arriba solo aparece con desbordamiento y suficiente desplazamiento', () => {
  assert.equal(shouldOfferScrollTop({ offset: 0, viewport: 700, content: 2000 }), false);
  assert.equal(shouldOfferScrollTop({ offset: 400, viewport: 700, content: 2000 }), true);
  assert.equal(shouldOfferScrollTop({ offset: 400, viewport: 700, content: 720 }), false);
  assert.equal(shouldOfferScrollTop({ offset: -20, viewport: 700, content: 2000 }), false);
  assert.equal(shouldOfferScrollTop({ offset: 0, viewport: 0, content: 0 }), false);
});
test('cada identidad abre el perfil de su propio rol', () => {
  for (const role of ['client', 'employee', 'admin'] as const)
    assert.equal(profileDestination(role), `/(${role})/profile`);
});
test('recarga visible sin duplicados, solapamientos ni actividad en segundo plano', async () => {
  let visible = true,
    clock = 0,
    calls = 0;
  let release = () => {};
  const refresh = createRefreshGate(
    () => {
      calls++;
      return new Promise<void>((resolve) => {
        release = resolve;
      });
    },
    () => visible,
    () => clock,
  );
  const first = refresh();
  await refresh();
  assert.equal(calls, 1);
  release();
  await first;
  await refresh();
  assert.equal(calls, 1);
  clock = 2000;
  visible = false;
  await refresh();
  assert.equal(calls, 1);
  visible = true;
  const next = refresh();
  assert.equal(calls, 2);
  release();
  await next;
});
