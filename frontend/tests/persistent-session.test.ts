import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  decodeCredential,
  encodeCredential,
  credentialLifetime,
} from '../src/utils/credentialCodec';
import {
  createWebCredentialStore,
  legacyCredentialKey,
  persistentCredentialKey,
} from '../src/api/webCredentialStore';
import type { CredentialStorage } from '../src/types/storedCredential';
import { socialProviders, socialProviderLabels } from '../src/constants/socialProviders';

/** Almacén de prueba independiente de globals/React; cerrar una pestaña descarta solo su mapa legacy. */
function memory(): CredentialStorage {
  const map = new Map<string, string>();
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => {
      map.set(key, value);
    },
    removeItem: (key) => {
      map.delete(key);
    },
  };
}
const first = 'a'.repeat(64),
  second = 'b'.repeat(64);

test('los tres proveedores conservan nombres distintos y orden estable en el acceso', () => {
  assert.deepEqual(socialProviders, ['google', 'discord', 'github']);
  assert.deepEqual(
    socialProviders.map((provider) => socialProviderLabels[provider]),
    ['Google', 'Discord', 'GitHub'],
  );
});

test('cerrar y reabrir conserva la credencial para los tres roles, sin persistir perfil, rol ni access', () => {
  for (const [index, role] of ['client', 'employee', 'admin'].entries()) {
    const disk = memory(),
      tab = memory(),
      id = String(index + 1);
    createWebCredentialStore(disk, tab, () => 100).write(first, id);
    const reopened = createWebCredentialStore(disk, memory(), () => 101).read();
    assert.deepEqual(
      reopened,
      { refreshToken: first, userId: id, expiresAt: 100 + credentialLifetime },
      role,
    );
    const json = disk.getItem(persistentCredentialKey)!;
    for (const forbidden of ['accessToken', 'password', 'role', 'email'])
      assert.ok(!json.includes(forbidden));
  }
});

test('migración: lee la sesión anterior y elimina su copia solo al guardar un sucesor confirmado', () => {
  const disk = memory(),
    tab = memory();
  tab.setItem(legacyCredentialKey, first);
  const store = createWebCredentialStore(disk, tab, () => 100);
  assert.equal(store.read()?.refreshToken, first);
  assert.equal(disk.getItem(persistentCredentialKey), null);
  store.write(second, '7');
  assert.equal(tab.getItem(legacyCredentialKey), null);
  assert.equal(store.read()?.refreshToken, second);
});

test('cerrar sesión impide que otra pestaña restaure un token antiguo todavía guardado en sessionStorage', () => {
  const disk = memory(),
    tabA = memory(),
    tabB = memory();
  tabB.setItem(legacyCredentialKey, first);
  const a = createWebCredentialStore(disk, tabA, () => 100);
  const b = createWebCredentialStore(disk, tabB, () => 100);
  a.write(second, '7');
  a.remove();
  assert.equal(b.read(), null);
  assert.ok(!disk.getItem(persistentCredentialKey)!.includes(second));
});

test('persistencia rechaza corrupción, versiones desconocidas y vencimiento; no confía en un rol local agregado', () => {
  assert.equal(
    decodeCredential(encodeCredential(first, '7', 100), 100 + credentialLifetime),
    null,
  );
  for (const raw of [
    '{',
    '{}',
    'null',
    JSON.stringify({ version: 99, refreshToken: first }),
    encodeCredential('invalid', '7', 100),
  ])
    assert.equal(decodeCredential(raw, 100), null);
  const altered = JSON.stringify({
    ...JSON.parse(encodeCredential(first, '7', 100)),
    role: 'admin',
  });
  assert.deepEqual(decodeCredential(altered, 100), {
    refreshToken: first,
    userId: '7',
    expiresAt: 100 + credentialLifetime,
  });
});
