import request from 'supertest';
import { randomUUID } from 'node:crypto';
import { after } from 'node:test';
import { DateTime, Settings as LuxonSettings } from 'luxon';
import { createApp } from '../../src/app.js';
import { database } from '../../src/config/database.js';
import type { User } from '../../src/types/domain.js';
if (process.env.NODE_ENV !== 'test')
  throw new Error('Las pruebas de aceptación requieren NODE_ENV=test y una base descartable.');
/** Sesión tipada de un usuario de pruebas. */
export interface TestSession {
  user: User;
  accessToken: string;
  refreshToken: string;
}
/** App real, repositories reales; no se simula MySQL. */
export const app = createApp({
  origins: [],
  checkDatabase: async () => {
    await database!.query('SELECT 1');
  },
});
after(async () => {
  await database?.end();
});
/** Contraseña exclusiva de fixtures locales. */
export const testPassword = 'Academic-Local-Test!2026';
/** Request autenticado del contrato público. */
export function api(
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  path: string,
  token?: string,
  body?: unknown,
) {
  const result = request(app)[method]('/api/v1' + path);
  if (token) result.set('Authorization', `Bearer ${token}`);
  if (body !== undefined) result.send(body as object);
  return result;
}

/** Fija la hora de negocio sin alterar la validez del JWT. */
export async function atBusinessTime<T>(instant: string, run: () => PromiseLike<T>) {
  const realClock = LuxonSettings.now;
  LuxonSettings.now = () => Date.parse(instant);
  try {
    return await run();
  } finally {
    LuxonSettings.now = realClock;
  }
}

/** Completa el flujo del empleado y del administrador con una hora comercial válida. */
export async function verifyWash(
  employee: string,
  admin: string,
  id: string,
  instant: string,
) {
  const base = `/appointments/${id}`;
  return atBusinessTime(instant, async () => {
    await api('post', base + '/wash-submission', employee, {
      description: 'Trabajo completo.',
    }).expect(201);
    const detail = await api('get', base, admin).expect(200);
    return api('patch', base + '/wash-review', admin, {
      submissionId: detail.body.data.wash.id,
      decision: 'approved',
    }).expect(200);
  });
}
/** Login de un fixture o del administrador semilla. */
export async function login(email: string, password = testPassword): Promise<TestSession> {
  return (await api('post', '/auth/login', undefined, { email, password }).expect(200)).body
    .data as TestSession;
}
/** Cuenta cliente nueva para aislar permisos y propiedad. */
export async function client(): Promise<TestSession> {
  return (
    await api('post', '/auth/register', undefined, {
      email: `${randomUUID()}@example.invalid`,
      password: testPassword,
      firstName: 'Cliente',
      lastName: 'Prueba',
      phone: '1100000000',
    }).expect(201)
  ).body.data as TestSession;
}
/** Sesión administrativa del seed local. */
export function admin() {
  return login(process.env.SEED_ADMIN_EMAIL!, process.env.SEED_ADMIN_PASSWORD!);
}
/** Crea empleado desde la API administrativa. */
export async function employee(token: string, canPay = false) {
  const email = `${randomUUID()}@example.invalid`;
  const user = (
    await api('post', '/users', token, {
      email,
      password: testPassword,
      firstName: 'Operario',
      lastName: 'Prueba',
      role: 'employee',
    }).expect(201)
  ).body.data as User;
  if (canPay)
    await api('patch', `/users/${user.id}`, token, { canRecordPayments: true }).expect(200);
  return login(email);
}
/** Registra un vehículo propio para la aceptación. */
export async function vehicle(token: string) {
  const type = (await api('get', '/vehicle-types', token).expect(200)).body.data[0];
  return (
    await api('post', '/vehicles', token, {
      plate: randomUUID().replaceAll('-', '').slice(0, 12),
      brand: 'Marca',
      model: 'Modelo',
      color: 'Azul',
      vehicleTypeId: type.id,
    }).expect(201)
  ).body.data as { id: string; ownerId: string; plate: string };
}
/** Fecha futura hábil para usar horarios de atención sin depender de la hora de ejecución. */
export function future(offset: number) {
  let day = DateTime.now().setZone('America/Argentina/Buenos_Aires').plus({ days: offset });
  if (day.weekday === 7) day = day.plus({ days: 1 });
  return day.toISODate()!;
}
/** Cotiza y devuelve el primer horario libre. */
export async function firstSlot(token: string, vehicleId: string, date: string) {
  const services = (await api('get', '/services', token).expect(200)).body.data as {
    id: string;
    code: string;
  }[];
  const serviceId = services.find((v) => v.code === 'exterior')!.id;
  const result = await api('get', '/availability', token)
    .query({ date, vehicleId, serviceIds: serviceId })
    .expect(200);
  return {
    serviceId,
    quote: result.body.data as {
      slots: string[];
      totalCents: number;
      durationMinutes: number;
    },
  };
}
