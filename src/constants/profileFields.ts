import type { FormFieldDefinition } from '../types/form';
/** Campos editables del perfil; el rol y el correo no se incluyen. */
export const profileFields: FormFieldDefinition[] = [
  { name: 'firstName', label: 'Nombre', maxLength: 80 },
  { name: 'lastName', label: 'Apellido', maxLength: 80 },
  { name: 'phone', label: 'Teléfono', required: false, maxLength: 30 },
];
