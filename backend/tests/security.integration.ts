import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  api,
  admin,
  client,
  employee,
  vehicle,
  login,
  testPassword,
} from './support/context.js';

test('registro rechaza inyección de rol, credenciales inválidas y rutas administrativas', async () => {
  await api('post', '/auth/register', undefined, {
    email: 'role@example.invalid',
    password: testPassword,
    firstName: 'A',
    lastName: 'B',
    role: 'admin',
  }).expect(400);
  const customer = await client();
  assert.equal(customer.user.role, 'client');
  assert.ok(!('passwordHash' in customer.user));
  await api('post', '/auth/login', undefined, {
    email: customer.user.email,
    password: 'incorrect',
  }).expect(401);
  await api('get', '/users', customer.accessToken).expect(403);
  await api('get', '/reports', customer.accessToken).expect(403);
  await api('get', '/settings', customer.accessToken).expect(403);
  await api('get', '/business', customer.accessToken).expect(200);
  await api('patch', '/users/me', customer.accessToken, { canRecordPayments: true }).expect(
    400,
  );
  await api('get', '/users/me', customer.accessToken + 'modified').expect(401);
});
test('ownership protege vehículos y las listas no incluyen datos ajenos', async () => {
  const a = await client();
  const b = await client();
  const v = await vehicle(a.accessToken);
  await api('get', `/vehicles/${v.id}`, b.accessToken).expect(404);
  await api('patch', `/vehicles/${v.id}`, b.accessToken, { color: 'Rojo' }).expect(404);
  await api('post', '/vehicles', b.accessToken, {
    plate: 'TEST-OWNER',
    brand: 'A',
    model: 'B',
    color: 'C',
    vehicleTypeId: '1',
    ownerId: a.user.id,
  }).expect(403);
  const list = await api('get', '/vehicles', b.accessToken).expect(200);
  assert.equal(list.body.data.total, 0);
  await api('patch', `/vehicles/${v.id}`, a.accessToken, { color: 'Gris' }).expect(200);
  await api('delete', `/vehicles/${v.id}`, a.accessToken).expect(200);
  await api('get', `/vehicles/${v.id}`, a.accessToken).expect(404);
});
test('refresh rota, detecta reuso y confirma revocación de toda la familia', async () => {
  const current = await client();
  const rotated = (
    await api('post', '/auth/refresh', undefined, {
      refreshToken: current.refreshToken,
    }).expect(200)
  ).body.data;
  assert.notEqual(rotated.refreshToken, current.refreshToken);
  await api('post', '/auth/refresh', undefined, { refreshToken: current.refreshToken }).expect(
    401,
  );
  await api('post', '/auth/refresh', undefined, { refreshToken: rotated.refreshToken }).expect(
    401,
  );
  const session = await login(current.user.email);
  await api('post', '/auth/logout', undefined, { refreshToken: session.refreshToken }).expect(
    200,
  );
  await api('post', '/auth/refresh', undefined, { refreshToken: session.refreshToken }).expect(
    401,
  );
  await api('get', '/users/me', session.accessToken).expect(401);
});
test('permisos se actualizan inmediatamente y admin no puede autoexcluirse', async () => {
  const owner = await admin();
  const staff = await employee(owner.accessToken);
  await api('post', '/appointments', staff.accessToken, {}).expect(403);
  await api('get', '/users', staff.accessToken).expect(403);
  await api('patch', `/users/${owner.user.id}/role`, owner.accessToken, {
    role: 'client',
  }).expect(403);
  await api('patch', `/users/${owner.user.id}`, owner.accessToken, { isActive: false }).expect(
    403,
  );
  await api('delete', `/users/${owner.user.id}`, owner.accessToken).expect(403);
  await api('patch', `/users/${staff.user.id}/role`, owner.accessToken, {
    role: 'client',
  }).expect(200);
  await api('get', '/users/me', staff.accessToken).expect(401);
  const changed = await login(staff.user.email);
  assert.equal(changed.user.role, 'client');
});
test('cambio de contraseña revoca sesiones y requiere contraseña actual', async () => {
  const customer = await client();
  await api('put', '/users/me/password', customer.accessToken, {
    currentPassword: 'wrong',
    newPassword: 'A-new-test-password!2026',
  }).expect(400);
  await api('put', '/users/me/password', customer.accessToken, {
    currentPassword: testPassword,
    newPassword: 'A-new-test-password!2026',
  }).expect(200);
  await api('get', '/users/me', customer.accessToken).expect(401);
  await login(customer.user.email, 'A-new-test-password!2026');
});
