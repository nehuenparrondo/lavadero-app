import type { Session, User } from '../../types/entities';
import { deleteRefresh, storeRefresh } from '../sessionStorage';
import { getSession, setSession } from '../sessionStore';
import * as auth from './authService';
import { readResource } from './resourceService';
/** Persiste el refresh antes de publicar la sesión para sus consumidores.
 * @param next - Sesión propia emitida por el backend al acceder o registrarse.
 * @returns `Promise<void>`.
 */
export const accept = async (next: Session) => {
  await storeRefresh(next.refreshToken);
  setSession(next);
};
/** Elimina primero el acceso local y después intenta revocar su familia en el backend.
 * @returns `Promise<void>`.
 */
export const signOut = async () => {
  const token = getSession()?.refreshToken;
  setSession(null);
  await deleteRefresh();
  if (token)
    try {
      await auth.logout(token);
    } catch {
      /* La sesión local ya se eliminó; backend aplica vencimiento. */
    }
};
/** Recarga el perfil propio después de editar, sin reemplazar las credenciales de sesión.
 * @returns `Promise<void>`.
 */
export const reloadUser = async () => {
  const current = getSession();
  if (current) {
    const user = await readResource<User>('/users/me');
    setSession({ ...current, user });
  }
};
