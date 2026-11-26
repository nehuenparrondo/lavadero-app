import type { Session, User } from '../../types/entities';
import { deleteRefresh, readStoredCredential, storeRefresh } from '../sessionStorage';
import { runSessionExclusive } from '../sessionLock';
import { changeSessionRevision, sessionRevision } from '../sessionRevision';
import { getSession, setSession } from '../sessionStore';
import * as auth from './authService';
import { readResource } from './resourceService';
/** Persiste el refresh antes de publicar la sesión para sus consumidores.
 * @param next - Sesión propia emitida por el backend al acceder o registrarse.
 * @returns `Promise<void>`.
 */
export const accept = async (next: Session) => {
  const revision = changeSessionRevision();
  await runSessionExclusive(async () => {
    if (sessionRevision() !== revision)
      throw new Error('El ingreso fue reemplazado por otra acción.');
    await storeRefresh(next.refreshToken, next.user.id);
    if (sessionRevision() === revision) setSession(next);
  });
};
/** Elimina primero el acceso local y después intenta revocar su familia en el backend.
 * @returns `Promise<void>`.
 */
export const signOut = async () => {
  const current = getSession();
  const revision = changeSessionRevision();
  setSession(null);
  const token = await runSessionExclusive(async () => {
    const stored = await readStoredCredential();
    if (
      sessionRevision() !== revision ||
      (stored?.userId && stored.userId !== current?.user.id)
    )
      return null;
    await deleteRefresh();
    return stored?.refreshToken ?? current?.refreshToken;
  });
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
    const latest = getSession();
    if (latest?.user.id === current.user.id) setSession({ ...latest, user });
  }
};
