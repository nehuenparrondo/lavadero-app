import {
  roleOptions,
  userIdentityFields,
  userPermissionFields,
} from '../constants/userFields';
import type { User } from '../types/entities';
import type { FormFieldDefinition } from '../types/form';
/** Ofrece roles solo al crear; ninguna edición permite cambiar el rol.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @returns `FormFieldDefinition[]`.
 */
export function userFields(current: User | null): FormFieldDefinition[] {
  const password: FormFieldDefinition = {
    name: 'password',
    label: 'Contraseña inicial',
    kind: 'password',
    minLength: 12,
    maxLength: 72,
  };
  return [
    ...userIdentityFields,
    ...(current
      ? userPermissionFields.filter(
          (field) => field.name !== 'canRecordPayments' || current.role === 'employee',
        )
      : [
          { name: 'role', label: 'Rol', kind: 'choice' as const, options: roleOptions },
          password,
        ]),
  ];
}
/** Serializa una cuenta a valores de formulario sin exponer credenciales.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @returns `Record<string, string>`.
 */
export function userInitialValues(current: User | null): Record<string, string> {
  return current
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
}
