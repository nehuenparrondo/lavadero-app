import type { FormFieldDefinition } from '../types/form';
/** Roles y etiquetas compartidos por los filtros y el editor administrativo. */
export const roleOptions = [
  { value: 'client', label: 'Cliente' },
  { value: 'employee', label: 'Empleado' },
];
/** Campos de identidad comunes a creación y edición de usuarios. */
export const userIdentityFields: FormFieldDefinition[] = [
  { name: 'firstName', label: 'Nombre', maxLength: 80 },
  { name: 'lastName', label: 'Apellido', maxLength: 80 },
  { name: 'email', label: 'Email', kind: 'email' },
  { name: 'phone', label: 'Teléfono', required: false, maxLength: 30 },
];
/** Permisos de cuentas existentes, validados nuevamente por el backend. */
export const userPermissionFields: FormFieldDefinition[] = [
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
];
