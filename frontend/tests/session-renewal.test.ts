import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createSessionRenewal } from '../src/utils/sessionRenewal';
import type { SessionRenewalDependencies } from '../src/utils/sessionRenewal';
import { createSerialQueue } from '../src/utils/serialQueue';
import type { StoredCredential } from '../src/types/storedCredential';
import type { Session, Role } from '../src/types/entities';

/** Sesión de prueba con rol decidido por el servidor simulado, nunca por persistencia local. */
function session(token: string, role: Role = 'client'): Session {
  return {
    refreshToken: token,
    accessToken: 'access',
    expiresIn: 900,
    user: {
      id: '7',
      role,
      email: 'fixture@example.invalid',
      firstName: 'Prueba',
      lastName: 'Sesión',
      phone: null,
      avatarUrl: null,
      isActive: true,
      canRecordPayments: false,
      hasPassword: true,
    },
  };
}
/** Dependencias aisladas con una credencial y la misma política de rechazo definitivo. */
function fixture(exchange: (token: string) => Promise<Session>) {
  let stored: StoredCredential | null = { refreshToken: 'a', userId: '7', expiresAt: null };
  let saved = 0,
    removed = 0;
  const deps: SessionRenewalDependencies = {
    read: async () => stored,
    save: async (next) => {
      stored = { refreshToken: next.refreshToken, userId: next.user.id, expiresAt: null };
      saved++;
    },
    remove: async () => {
      stored = null;
      removed++;
    },
    exchange,
    exclusive: createSerialQueue(),
    rejected: (error) => error instanceof Error && error.message === '401',
  };
  return {
    deps,
    state: () => ({ stored, saved, removed }),
    clear: () => {
      stored = null;
    },
  };
}

test('dos consumidores de restauración comparten un canje y persisten el sucesor aunque una vista se desmonte', async () => {
  let release!: () => void,
    calls = 0;
  const wait = new Promise<void>((resolve) => {
    release = resolve;
  });
  const f = fixture(async () => {
    calls++;
    await wait;
    return session('b');
  });
  const renew = createSessionRenewal(f.deps),
    a = renew(),
    b = renew();
  assert.equal(a, b);
  release();
  await Promise.all([a, b]);
  assert.equal(calls, 1);
  assert.equal(f.state().saved, 1);
  assert.equal(f.state().stored?.refreshToken, 'b');
});

test('dos pestañas con el mismo bloqueo rotan siempre el último token, sin reutilizar el anterior', async () => {
  const calls: string[] = [];
  const f = fixture(async (token) => {
    calls.push(token);
    return session(token + 'x');
  });
  await Promise.all([createSessionRenewal(f.deps)(), createSessionRenewal(f.deps)()]);
  assert.deepEqual(calls, ['a', 'ax']);
  assert.equal(f.state().stored?.refreshToken, 'axx');
});

test('un cierre en cola quita el sucesor y una restauración posterior no vuelve a llamar al servidor', async () => {
  let release!: () => void, started!: () => void;
  const wait = new Promise<void>((resolve) => {
      release = resolve;
    }),
    entered = new Promise<void>((resolve) => {
      started = resolve;
    });
  const f = fixture(async () => {
      started();
      await wait;
      return session('b');
    }),
    renew = createSessionRenewal(f.deps);
  const pending = renew();
  await entered;
  const closing = f.deps.exclusive(f.deps.remove);
  release();
  await Promise.all([pending, closing]);
  assert.equal(f.state().stored, null);
  assert.equal(await renew(), null);
});

test('una respuesta tardía no resucita credenciales borradas mientras viajaba la solicitud', async () => {
  const f = fixture(async () => {
    f.clear();
    return session('b');
  });
  await assert.rejects(createSessionRenewal(f.deps)(), /sesión cambió/u);
  assert.equal(f.state().saved, 0);
  assert.equal(f.state().stored, null);
});

test('red y 5xx conservan persistencia; un rechazo definitivo la elimina y la cola permite reintentar', async () => {
  for (const message of ['Sin conexión', '503', '401']) {
    const f = fixture(async () => {
      throw new Error(message);
    });
    await assert.rejects(createSessionRenewal(f.deps)(), new RegExp(message));
    assert.equal(f.state().removed, message === '401' ? 1 : 0);
  }
  let first = true;
  const f = fixture(async () => {
      if (first) {
        first = false;
        throw new Error('Sin conexión');
      }
      return session('b');
    }),
    renew = createSessionRenewal(f.deps);
  await assert.rejects(renew());
  assert.equal((await renew())?.refreshToken, 'b');
});

test('el rol restaurado proviene de la respuesta del servidor para cliente, empleado y administrador', async () => {
  for (const role of ['client', 'employee', 'admin'] as const) {
    const f = fixture(async () => session('b', role));
    assert.equal((await createSessionRenewal(f.deps)())?.user.role, role);
  }
});

test('la cola libera el turno después de un error y mantiene el orden de escrituras', async () => {
  const run = createSerialQueue(),
    calls: number[] = [];
  const a = run(async () => {
    calls.push(1);
    throw new Error('fallo');
  });
  const b = run(async () => {
    calls.push(2);
    return 'ok';
  });
  await assert.rejects(a);
  assert.equal(await b, 'ok');
  assert.deepEqual(calls, [1, 2]);
});
