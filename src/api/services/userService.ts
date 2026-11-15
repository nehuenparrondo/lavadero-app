import type { User } from '../../types/entities';
import { writeResource } from './resourceService';
/** Alta de cliente/empleado o edición administrativa que conserva el rol actual.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @param v - Datos tipados del elemento o formulario que se transforma.
 * @returns `Promise<unknown>`.
 */
export async function saveUser(current: User | null, v: Record<string, string>) {
  const profile = {
    email: v.email,
    firstName: v.firstName,
    lastName: v.lastName,
    phone: v.phone || null,
  };
  if (!current)
    return writeResource('post', '/users', {
      ...profile,
      phone: v.phone || '',
      password: v.password,
      role: v.role,
    });
  await writeResource('patch', `/users/${current.id}`, {
    ...profile,
    isActive: v.isActive === 'true',
    canRecordPayments: v.canRecordPayments === 'true',
  });
  return { updated: true };
}
