import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { User } from '../src/types/entities';
import { userFields } from '../src/utils/userForm';
import { buildFormSchema } from '../src/utils/buildFormSchema';
import { restoreDestination } from '../src/utils/restoreDestination';

test('crear ofrece cliente/empleado; editar conserva cualquier rol sin enviar privilegios', () => {
  const create = userFields(null);
  assert.deepEqual(
    create.find((f) => f.name === 'role')?.options?.map((v) => v.value),
    ['client', 'employee'],
  );
  for (const role of ['client', 'employee', 'admin'] as const) {
    const fields = userFields({ role } as User);
    assert.equal(
      fields.some((f) => f.name === 'role' || f.name === 'password'),
      false,
    );
    assert.equal(
      fields.some((f) => f.name === 'canRecordPayments'),
      role === 'employee',
    );
  }
  const schema = buildFormSchema(create);
  assert.equal(
    schema.safeParse({
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'qa@example.invalid',
      phone: '',
      password: 'Academic-Local-Test!2026',
      role: 'admin',
    }).success,
    false,
  );
});

test('retorno a ingreso sin turno solo se restaura para administración', () => {
  assert.equal(restoreDestination('/walk-in', 'admin'), '/(admin)/walk-in');
  assert.equal(restoreDestination('/walk-in', 'client'), '/');
  assert.equal(restoreDestination('/walk-in', 'employee'), '/');
});
