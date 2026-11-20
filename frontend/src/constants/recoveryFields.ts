import type { FormFieldDefinition } from '../types/form';
/** Solicitud sin campos de rol, retorno ni información privada adicional. */
export const recoveryFields: FormFieldDefinition[] = [
  { name: 'email', label: 'Correo de tu cuenta', kind: 'email', maxLength: 254 },
];
/** El servidor valida también longitud por bytes y el token de un solo uso. */
export const resetFields: FormFieldDefinition[] = [
  {
    name: 'newPassword',
    label: 'Nueva contraseña',
    kind: 'password',
    minLength: 12,
    maxLength: 72,
  },
  {
    name: 'confirmPassword',
    label: 'Repetí la nueva contraseña',
    kind: 'password',
    minLength: 12,
    maxLength: 72,
  },
];
