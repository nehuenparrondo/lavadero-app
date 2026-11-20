import type { Request } from 'express';
import type { z } from 'zod';
import type { loginSchema, refreshSchema, registerSchema } from './auth.schema.js';
import * as service from './auth.service.js';
import { presentSession } from './auth.types.js';
import * as sessions from './session.service.js';

/** Registra cuenta pública sin permisos elegibles.
 * @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
 * @returns `Promise<{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; }>`.
 */
export function register(request: Request) {
  return service.register(request.body as z.infer<typeof registerSchema>).then(presentSession);
}
/** Inicia sesión email/contraseña.
 * @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
 * @returns `Promise<{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; }>`.
 */
export function login(request: Request) {
  return service.login(request.body as z.infer<typeof loginSchema>).then(presentSession);
}
/** Renueva sesión mediante rotación de refresh.
 * @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
 * @returns `Promise<{ user: import("../../types/domain.js").User; accessToken: string; refreshToken: string; expiresIn: number; }>`.
 */
export function refresh(request: Request) {
  return sessions
    .refreshSession((request.body as z.infer<typeof refreshSchema>).refreshToken)
    .then(presentSession);
}
/** Revoca la sesión del dispositivo.
 * @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
 * @returns `Promise<{ loggedOut: boolean; }>`.
 */
export function logout(request: Request) {
  return sessions.logoutSession((request.body as z.infer<typeof refreshSchema>).refreshToken);
}
