import { randomUUID } from 'node:crypto';
import { AppError } from '../../errors/AppError.js';
import type { Executor } from '../../utils/db.js';
import { transaction } from '../../utils/transaction.js';
import { findUser } from '../users/users.repository.js';
import type { Identity } from '../users/users.types.js';
import { publicUser } from '../users/users.types.js';
import * as repository from './session.repository.js';
import { opaqueToken, signAccess, tokenHash } from './token.service.js';

/** Crea una sesión propia; el llamador debe haber comprobado que la cuenta siga activa.
 * @param identity Fila interna: publicUser elimina hash y campos privados antes de devolver el perfil.
 * @param executor Conexión de la operación, para insertar la sesión dentro de la misma transacción.
 * @param familyId Familia nueva por defecto; renovar conserva la familia para detectar reuso y cerrar el dispositivo.
 * @returns Perfil público, tokens, ID de sesión y expiresIn en segundos; SQL guarda solo el hash del refresh.
 */
export async function createSession(
  identity: Identity,
  executor?: Executor,
  familyId: string = randomUUID(),
) {
  const user = publicUser(identity);
  const accessToken = await signAccess(user, familyId);
  const refreshToken = opaqueToken();
  const sessionId = await repository.insertSession(
    user.id,
    tokenHash(refreshToken),
    familyId,
    executor,
  );
  return { user, accessToken, refreshToken, expiresIn: 900, sessionId };
}
/** Rota un refresh bajo bloqueo y revoca su familia cuando detecta reuso o vencimiento.
 * @param token Refresh opaco original; solo su hash se consulta en persistencia.
 * @returns Nuevo access/refresh de la misma familia después de revocar el anterior.
 * @throws AppError INVALID_REFRESH si la sesión ya no es válida.
 * @remarks El resultado null permite confirmar la revocación antes de emitir 401.
 */
export async function refreshSession(token: string) {
  const result = await transaction(async (connection) => {
    const current = await repository.lockSession(tokenHash(token), connection);
    if (!current) return null;
    if (current.revokedAt || new Date(current.expiresAt + 'Z').getTime() <= Date.now()) {
      await repository.revokeFamily(current.familyId, connection);
      return null;
    }
    const identity = await findUser(current.userId, connection);
    if (!identity || !identity.isActive || identity.deletedAt) {
      await repository.revokeFamily(current.familyId, connection);
      return null;
    }
    const next = await createSession(identity, connection, current.familyId);
    await repository.rotateSession(current.id, next.sessionId, connection);
    return next;
  });
  if (!result)
    throw new AppError(401, 'INVALID_REFRESH', 'La sesión ya no es válida. Iniciá sesión.');
  return result;
}
/** Revoca la familia completa, incluidos los access JWT de esa sesión todavía vigentes.
 * @param token Refresh del dispositivo; se busca por hash, sin almacenar la credencial legible.
 * @returns loggedOut true incluso si ya no existía la sesión; repetir el cierre es seguro.
 */
export async function logoutSession(token: string) {
  await transaction(async (connection) => {
    const current = await repository.lockSession(tokenHash(token), connection);
    if (current) await repository.revokeFamily(current.familyId, connection);
  });
  return { loggedOut: true };
}
