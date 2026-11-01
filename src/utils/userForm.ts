import {
  roleOptions,
  userIdentityFields,
  userPermissionFields,
} from '../constants/userFields';
import type { User } from '../types/entities';
import type { FormFieldDefinition } from '../types/form';
/** Construye opciones autorizadas; la cuenta propia conserva el rol administrador.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @param userId - Identificador interno de cuenta, independiente del subject del proveedor.
 * @returns `FormFieldDefinition[]`.
 */
export function userFields(
  current: User | null,
  userId: string | undefined,
): FormFieldDefinition[] {
  const roles =
    current?.id === userId ? roleOptions.filter((r) => r.value === 'admin') : roleOptions;
  const password: FormFieldDefinition = {
    name: 'password',
    label: 'Contraseña inicial',
    kind: 'password',
    minLength: 12,
    maxLength: 72,
  };
  return [
    ...userIdentityFields,
    { name: 'role', label: 'Rol', kind: 'choice', options: roles },
    ...(current ? userPermissionFields : [password]),
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
