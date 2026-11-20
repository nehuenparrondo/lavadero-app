import type { createSession } from './session.service.js';

/** Devuelve solo el contrato de sesión; el ID interno de rotación no se publica.
 * @param session - Sesión del backend en memoria, o null para cerrar el acceso local.
 * @returns `{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; }`.
 */
export function presentSession(session: Awaited<ReturnType<typeof createSession>>) {
  return {
    user: session.user,
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    expiresIn: session.expiresIn,
  };
}
