import assert from 'node:assert/strict';
import { test } from 'node:test';
import { AxiosError } from 'axios';
import { createReadinessGate } from '../src/api/readinessGate';
import { currentQuery, readLatest } from '../src/utils/queryState';
import { canBook } from '../src/utils/bookingAvailability';
import { calendarDays, shiftMonth, validDate } from '../src/utils/calendar';
import { bookingOptions } from '../src/utils/bookingSelection';
import { isSessionRejected } from '../src/utils/sessionFailure';
import { restoreDestination } from '../src/utils/restoreDestination';

test('recargar conserva enlaces de reserva/detalle, sin redirecciones externas ni acceso de otro rol', () => {
  assert.equal(restoreDestination('/booking', 'client'), '/booking');
  assert.equal(restoreDestination('/appointment/123', 'employee'), '/appointment/123');
  assert.equal(restoreDestination('/reports', 'admin'), '/(admin)/reports');
  for (const role of ['client', 'employee', 'admin'] as const)
    assert.equal(restoreDestination('/profile', role), `/(${role})/profile`);
  for (const destination of [
    'https://evil.example',
    '//evil.example',
    '/reports',
    '/booking?returnTo=https://evil.example',
  ])
    assert.equal(restoreDestination(destination, 'employee'), '/');
});

test('servidor dormido: comparte conexión, tolera HTML/transitorios y no sondea estando inactivo', async () => {
  let now = 1,
    attempts = 0,
    release!: () => void;
  const notifications: boolean[] = [];
  const pause = new Promise<void>((resolve) => {
    release = resolve;
  });
  const gate = createReadinessGate({
    now: () => now,
    notify: (v) => notifications.push(v),
    probe: async () => ++attempts > 1,
    pause: async () => {
      now += 100;
      await pause;
    },
  });
  const a = gate.ensure(),
    b = gate.ensure();
  assert.equal(a, b);
  release();
  await Promise.all([a, b]);
  assert.equal(attempts, 2);
  await gate.ensure();
  assert.equal(attempts, 2);
  assert.deepEqual(notifications, [true, false]);
  now += 121000;
  await gate.ensure();
  assert.equal(attempts, 3);
});

test('la conexión termina y permite reintentar después de agotar su plazo', async () => {
  let now = 1,
    online = false,
    active = false;
  const gate = createReadinessGate({
    now: () => now,
    notify: (v) => {
      active = v;
    },
    probe: async () => online,
    pause: async () => {
      now += 10;
    },
    budgetMs: 20,
  });
  await assert.rejects(gate.ensure(), /No pudimos conectar/u);
  assert.equal(active, false);
  online = true;
  await gate.ensure();
});

test('cambiar filtros o deshabilitar consulta oculta datos y errores anteriores inmediatamente', () => {
  const state = { key: 'lunes', data: ['09:30'], loading: false, error: '' };
  assert.deepEqual(currentQuery(state, 'martes', true), {
    data: null,
    loading: true,
    error: '',
  });
  assert.deepEqual(currentQuery({ ...state, error: 'falló' }, 'lunes', false), {
    data: null,
    loading: false,
    error: '',
  });
});

test('una respuesta tardía no reemplaza el resultado de la selección más reciente', async () => {
  let release!: (v: string) => void,
    generation = 1;
  const values: string[] = [];
  const old = readLatest(
    () =>
      new Promise<string>((resolve) => {
        release = resolve;
      }),
    () => generation === 1,
    (value) => values.push(value),
  );
  generation = 2;
  await readLatest(
    async () => 'martes',
    () => generation === 2,
    (value) => values.push(value),
  );
  release('lunes');
  await old;
  assert.deepEqual(values, ['martes']);
});

test('solo confirma un inicio futuro de la cotización actual, sin carga ni errores', () => {
  const slot = new Date(Date.now() + 86400000).toISOString();
  const quote = { slots: [slot], totalCents: 100, durationMinutes: 35, currencyCode: 'ARS' };
  assert.equal(canBook(quote, slot, false, ''), true);
  for (const blocked of [
    canBook(null, slot, false, ''),
    canBook(quote, slot, true, ''),
    canBook(quote, slot, false, 'sin red'),
    canBook({ ...quote, slots: [] }, slot, false, ''),
  ])
    assert.equal(blocked, false);
});

test('calendario valida bisiestos, límites de mes y domingo sin cambiar por zona horaria', () => {
  assert.equal(validDate('2028-02-29'), true);
  assert.equal(validDate('2026-02-29'), false);
  assert.equal(validDate('2026-02-31'), false);
  assert.equal(validDate('2026-13-01'), false);
  assert.equal(shiftMonth('2026-12', 1), '2027-01');
  assert.equal(shiftMonth('2026-01', -1), '2025-12');
  const days = calendarDays('2026-11');
  assert.equal(days[6], '2026-11-01');
  assert.equal(days.filter(Boolean).length, 30);
  assert.equal(new Set(days.filter(Boolean)).size, 30);
});

test('una baja de vehículo/tarifa o cambio de titular invalida la selección de reserva', () => {
  const selection = { clientId: '1', vehicleId: '1', serviceIds: '1', date: '2026-11-02' };
  const vehicles = [
    {
      id: '1',
      ownerId: '1',
      vehicleTypeId: '1',
      plate: 'QA123AA',
      brand: 'QA',
      model: 'Demo',
      color: 'Azul',
      typeName: 'Auto',
    },
  ];
  const services = [
    {
      id: '1',
      code: 'QA',
      name: 'Demo',
      description: '',
      durationMinutes: 35,
      isActive: true,
      prices: [{ vehicleTypeId: '1', priceCents: 100 }],
    },
  ];
  assert.equal(bookingOptions(selection, vehicles, services).ready, true);
  assert.equal(
    bookingOptions({ ...selection, clientId: '2' }, vehicles, services).ready,
    false,
  );
  assert.equal(bookingOptions(selection, [], services).ready, false);
  assert.equal(
    bookingOptions(selection, vehicles, [{ ...services[0]!, prices: [] }]).ready,
    false,
  );
});

test('una caída de red/5xx no borra sesión; solo 401/403 la invalidan', () => {
  const error = (status: number) =>
    new AxiosError('HTTP', undefined, undefined, undefined, {
      status,
      statusText: '',
      headers: {},
      config: {} as never,
      data: {},
    });
  assert.equal(isSessionRejected(new AxiosError('sin red')), false);
  assert.equal(isSessionRejected(error(503)), false);
  assert.equal(isSessionRejected(error(429)), false);
  assert.equal(isSessionRejected(error(401)), true);
  assert.equal(isSessionRejected(error(403)), true);
});
