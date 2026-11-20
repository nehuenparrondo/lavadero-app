import type { FormFieldDefinition } from '../types/form';
/** Campos de acceso sin selector de rol. */
export const loginFields: FormFieldDefinition[] = [
  { name: 'email', label: 'Email', kind: 'email', placeholder: 'nombre@ejemplo.com' },
  { name: 'password', label: 'Contraseña', kind: 'password' },
];
/** El registro público siempre crea Cliente; el rol no se envía. */
export const registerFields: FormFieldDefinition[] = [
  { name: 'firstName', label: 'Nombre', maxLength: 80 },
  { name: 'lastName', label: 'Apellido', maxLength: 80 },
  { name: 'phone', label: 'Teléfono', required: false, maxLength: 30 },
  ...loginFields.map((f) =>
    f.name === 'password' ? { ...f, minLength: 12, maxLength: 72 } : f,
  ),
];
