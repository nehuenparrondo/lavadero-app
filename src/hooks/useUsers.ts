import { useState } from 'react';
import type { User } from '../types/entities';
import type { FormFieldDefinition } from '../types/form';
import { useDebouncedValue } from './useDebouncedValue';
import { useEntityManager } from './useEntityManager';
import { useAuth } from './useAuth';
import { saveUser } from '../api/services/userService';
/** Gestión administrativa con búsqueda, roles y permisos explícitos. */
export function useUsers() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const query = useDebouncedValue(search);
  const manager = useEntityManager<User>(
    '/users',
    (v) => v,
    { search: query, role: role || undefined },
    (current, body) => saveUser(current, body as Record<string, string>),
  );
  const current = manager.editing;
  const roles = [
    { value: 'client', label: 'Cliente' },
    { value: 'employee', label: 'Empleado' },
    { value: 'admin', label: 'Administrador' },
  ];
  const fields: FormFieldDefinition[] = [
    { name: 'firstName', label: 'Nombre', maxLength: 80 },
    { name: 'lastName', label: 'Apellido', maxLength: 80 },
    { name: 'email', label: 'Email', kind: 'email' },
    { name: 'phone', label: 'Teléfono', required: false, maxLength: 30 },
    {
      name: 'role',
      label: 'Rol',
      kind: 'choice',
      options: current?.id === user?.id ? roles.filter((r) => r.value === 'admin') : roles,
    },
  ];
  if (!current)
    fields.push({
      name: 'password',
      label: 'Contraseña inicial',
      kind: 'password',
      minLength: 12,
      maxLength: 72,
    });
  else
    fields.push(
      {
        name: 'isActive',
        label: 'Estado',
        kind: 'choice',
        options: [
          { value: 'true', label: 'Activo' },
          { value: 'false', label: 'Inactivo' },
        ],
      },
      {
        name: 'canRecordPayments',
        label: 'Permitir registro de cobros (empleado)',
        kind: 'choice',
        options: [
          { value: 'false', label: 'No' },
          { value: 'true', label: 'Sí' },
        ],
      },
    );
  const initialValues: Record<string, string> = current
    ? {
        firstName: current.firstName,
        lastName: current.lastName,
        email: current.email,
        phone: current.phone ?? '',
        role: current.role,
        isActive: String(current.isActive),
        canRecordPayments: String(current.canRecordPayments),
      }
    : { role: 'client' };
  return { ...manager, search, setSearch, role, setRole, fields, initialValues };
}
