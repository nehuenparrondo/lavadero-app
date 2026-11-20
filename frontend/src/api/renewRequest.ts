import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { isSessionRejected } from '../utils/sessionFailure';
import { refreshSession } from './services/authService';
import { deleteRefresh, storeRefresh } from './sessionStorage';
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
  const next = await refreshSession(current.refreshToken);
  if (getSession()?.refreshToken !== current.refreshToken)
    throw new Error('La sesión cambió durante la solicitud.');
  await storeRefresh(next.refreshToken);
  setSession(next);
  return next.accessToken;
}
/** Borra credenciales solo si todavía corresponden a la renovación rechazada. */
async function rejectSession(error: unknown, originalToken: string) {
  if (isSessionRejected(error) && getSession()?.refreshToken === originalToken) {
    setSession(null);
    await deleteRefresh();
  }
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
