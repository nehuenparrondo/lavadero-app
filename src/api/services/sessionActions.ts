import type { Session, User } from '../../types/entities';
import { deleteRefresh, storeRefresh } from '../sessionStorage';
import { getSession, setSession } from '../sessionStore';
import * as auth from './authService';
import { readResource } from './resourceService';
/** Ejecuta la operación tipada de este módulo.
 * @param next - Valor tipado de next utilizado por esta operación.
 * @returns `Promise<void>`, según el contrato de la operación.
 */
export const accept = async (next: Session) => {
  await storeRefresh(next.refreshToken);
  setSession(next);
};
/** Ejecuta la operación tipada de este módulo.
 * @returns `Promise<void>`, según el contrato de la operación.
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
/** Ejecuta la operación tipada de este módulo.
 * @returns `Promise<void>`, según el contrato de la operación.
 */
export const reloadUser = async () => {
  const current = getSession();
  if (current) {
    const user = await readResource<User>('/users/me');
    setSession({ ...current, user });
  }
};
