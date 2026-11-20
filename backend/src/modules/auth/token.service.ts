import { SignJWT, jwtVerify } from 'jose';
import { createHash, randomBytes } from 'node:crypto';
import { authEnv } from '../../config/authEnv.js';
import { AppError } from '../../errors/AppError.js';
import type { Actor } from '../../types/domain.js';

/** Obtiene clave secreta HMAC de firma desde entorno. @throws AppError 503 si falta configuración. */
function signingKey() {
  if (!authEnv.JWT_ACCESS_SECRET)
    throw new AppError(
      503,
      'AUTH_UNAVAILABLE',
      'La autenticación requiere configuración del servidor.',
    );
  return new TextEncoder().encode(authEnv.JWT_ACCESS_SECRET);
}
/** Emite JWT de quince minutos con audiencia e issuer restringidos.
 * @param user - Perfil vigente; nunca incluye una contraseña legible.
 * @param familyId - Familia de sesión que agrupa sus renovaciones.
 * @returns `Promise<string>`.
 */
export function signAccess(user: Actor, familyId?: string) {
  return new SignJWT({
    role: user.role,
    version: user.authVersion,
    ...(familyId ? { family: familyId } : {}),
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(user.id)
    .setIssuer(authEnv.JWT_ISSUER)
    .setAudience(authEnv.JWT_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(signingKey());
}
/** Verifica firma y tiempo. @throws AppError 401 si expiró o fue alterado.
 * @param token - Token recibido; se valida o transforma antes de utilizarlo.
 * @returns `Promise<import("jose").JWTPayload>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function verifyAccess(token: string) {
  try {
    return (
      await jwtVerify(token, signingKey(), {
        algorithms: ['HS256'],
        issuer: authEnv.JWT_ISSUER,
        audience: authEnv.JWT_AUDIENCE,
      })
    ).payload;
  } catch {
    throw new AppError(401, 'SESSION_EXPIRED', 'La sesión venció. Volvé a ingresar.');
  }
}
/** Genera tokens criptográficos opacos.
 * @returns `string`.
 */
export function opaqueToken() {
  return randomBytes(32).toString('hex');
}
/** Hash irreversible para persistir tokens revocables.
 * @param token - Token recibido; se valida o transforma antes de utilizarlo.
 * @returns `NonSharedBuffer`.
 */
export function tokenHash(token: string) {
  return createHash('sha256').update(token).digest();
}
