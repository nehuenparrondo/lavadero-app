import { createSessionRenewal } from '../../utils/sessionRenewal';
import { isSessionRejected } from '../../utils/sessionFailure';
import { readStoredCredential, storeRefresh, deleteRefresh } from '../sessionStorage';
import { runSessionExclusive } from '../sessionLock';
import { refreshSession } from './authService';
const renew = createSessionRenewal({
  read: readStoredCredential,
  save: (next) => storeRefresh(next.refreshToken, next.user.id),
  remove: deleteRefresh,
  exchange: refreshSession,
  exclusive: runSessionExclusive,
  rejected: isSessionRejected,
});
/** Única vía de rotación usada por restauración e interceptor; evita reuso accidental del refresh.
 * @returns Sesión validada en servidor o null si el usuario cerró sesión; puede rechazar por red o revocación.
 */
export function renewStoredSession() {
  return renew();
}
