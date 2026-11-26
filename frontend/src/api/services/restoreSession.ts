import { isSessionRejected } from '../../utils/sessionFailure';
import { setSession } from '../sessionStore';
import { sessionRevision } from '../sessionRevision';
import { renewStoredSession } from './sessionRenewalService';
/** Restaura la sesión segura sin publicar resultados de un proveedor desmontado.
 * @param isActive - Permite descartar el resultado si el consumidor se desmontó.
 * @returns `Promise<void>`.
 */
export async function restoreSession(isActive: () => boolean) {
  const revision = sessionRevision();
  try {
    const next = await renewStoredSession();
    if (isActive() && sessionRevision() === revision) setSession(next);
  } catch (error) {
    if (!isSessionRejected(error)) throw error;
    if (isActive() && sessionRevision() === revision) setSession(null);
  }
}
