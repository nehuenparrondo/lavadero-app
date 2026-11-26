import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { isSessionRejected } from '../utils/sessionFailure';
import { renewStoredSession } from './services/sessionRenewalService';
import { deleteRefresh, readRefresh } from './sessionStorage';
import { runSessionExclusive } from './sessionLock';
import { sessionRevision } from './sessionRevision';
import { getSession, setSession } from './sessionStore';
/** Marca la identidad de origen para no repetir peticiones de otra cuenta. */
export type AuthRequestConfig = InternalAxiosRequestConfig & {
  retried?: boolean;
  actorId?: string;
};
let refreshing: Promise<string> | null = null;
/** Renueva una vez; las solicitudes concurrentes comparten la misma rotación. */
async function renew() {
  const current = getSession();
  if (!current) throw new Error('Tu sesión venció.');
  const revision = sessionRevision();
  const next = await renewStoredSession();
  if (!next || next.user.id !== current.user.id || sessionRevision() !== revision)
    throw new Error('La sesión cambió durante la solicitud.');
  setSession(next);
  return next.accessToken;
}
/** Borra credenciales solo si todavía corresponden a la renovación rechazada. */
async function rejectSession(error: unknown, originalToken: string) {
  if (isSessionRejected(error))
    await runSessionExclusive(async () => {
      const stored = await readRefresh();
      if (getSession()?.refreshToken !== originalToken || (stored && stored !== originalToken))
        return;
      setSession(null);
      await deleteRefresh();
    });
  throw error;
}
/** Reintenta solo un rechazo 401, conservando sesión en errores de red y servidor.
 * @param error Rechazo del transporte autenticado.
 * @param retry Cliente que vuelve a ejecutar la petición una sola vez.
 * @returns Respuesta autorizada o el rechazo original.
 */
export async function renewRequest(
  error: unknown,
  retry: (config: AuthRequestConfig) => Promise<AxiosResponse>,
) {
  if (!axios.isAxiosError(error) || error.response?.status !== 401 || !error.config)
    throw error;
  const config = error.config as AuthRequestConfig;
  const original = getSession();
  if (!original || config.actorId !== original.user.id) throw error;
  if (config.retried) return rejectSession(error, original.refreshToken);
  config.retried = true;
  // Un 401 tardío puede llegar después de que otra petición ya renovó el token.
  if (config.headers.Authorization !== `Bearer ${original.accessToken}`) return retry(config);
  try {
    refreshing ??= renew().finally(() => {
      refreshing = null;
    });
    config.headers.Authorization = `Bearer ${await refreshing}`;
    return await retry(config);
  } catch (refreshError) {
    return rejectSession(refreshError, original.refreshToken);
  }
}
