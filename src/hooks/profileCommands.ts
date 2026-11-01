import { writeResource } from '../api/services/resourceService';
import type { useAction } from './useAction';
import type { useAuth } from './useAuth';
/** Operaciones propias; cambiar contraseña revoca sesiones e inicia nuevamente el acceso.
 * @param auth - Valor tipado de auth utilizado por esta operación.
 * @param action - Valor tipado de action utilizado por esta operación.
 * @returns `{ save: (v: Record<string, string>) => Promise<void>; changePassword: (v: Record<string, string>) => Promise<void>; }`, según el contrato de la operación.
 */
export function profileCommands(
  auth: ReturnType<typeof useAuth>,
  action: ReturnType<typeof useAction>,
) {
  const save = async (v: Record<string, string>) => {
    await action.run(async () => {
      await writeResource('patch', '/users/me', {
        firstName: v.firstName,
        lastName: v.lastName,
        phone: v.phone || null,
        avatarUrl: v.avatarUrl || null,
      });
      await auth.reloadUser();
    });
  };
  const changePassword = async (v: Record<string, string>) => {
    await action.run(async () => {
      await writeResource('put', '/users/me/password', {
        currentPassword: v.currentPassword,
        newPassword: v.newPassword,
      });
      await auth.signOut();
    }, 'Volvé a ingresar con tu nueva contraseña.');
  };
  return { save, changePassword };
}
