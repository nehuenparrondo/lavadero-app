import type { User } from '../../types/entities';
import { writeResource } from './resourceService';
/** Alta o edición administrativa; los cambios de rol tienen endpoint independiente. */
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
  if (v.role !== current.role)
    await writeResource('patch', `/users/${current.id}/role`, { role: v.role });
  return { updated: true };
}
