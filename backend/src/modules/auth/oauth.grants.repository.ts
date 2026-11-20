import type { RowDataPacket } from 'mysql2/promise';
import type { Executor } from '../../utils/db.js';
import { execute, rows } from '../../utils/db.js';
import type { Provider } from './oauth.types.js';
/** Candidato verificado por el proveedor; aún no vinculado a la cuenta local. */
export interface PendingLink {
  provider: Provider;
  subject: string;
}
/** Datos internos del grant; jamás se presentan al frontend. */
export interface OAuthGrant extends RowDataPacket {
  userId: string;
  codeChallenge: string;
  /** Proveedor pendiente de vincular después de comprobar la contraseña local. */
  linkProvider: Provider | null;
  linkSubject: string | null;
  /** Intentos fallidos confirmados; impide seguir probando tras el límite. */
  linkAttempts: number;
}
/** Persiste solo hash; ofrece cinco minutos para confirmar una vinculación local.
 * @param hash - Hash del token; evita persistir su valor legible.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param challenge - Desafío S256 ligado al verifier que conserva el cliente.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @param link - Identidad social candidata, pendiente de comprobar la contraseña local.
 * @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function saveGrant(
  hash: Buffer,
  id: string,
  challenge: string,
  executor: Executor,
  link?: PendingLink,
) {
  return execute(
    `INSERT INTO autorizaciones_oauth(code_hash,user_id,code_challenge,link_provider,link_subject,expires_at)
 VALUES(?,?,?,?,?,DATE_ADD(UTC_TIMESTAMP(3),INTERVAL ? SECOND))`,
    [hash, id, challenge, link?.provider ?? null, link?.subject ?? null, link ? 300 : 60],
    executor,
  );
}
/** Bloquea el grant para serializar intentos y evitar dos sesiones por el mismo código.
 * @param hash - Hash del token; evita persistir su valor legible.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<OAuthGrant | undefined>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function lockGrant(hash: Buffer, executor: Executor) {
  return (
    await rows<OAuthGrant>(
      `SELECT CAST(user_id AS CHAR) userId,code_challenge codeChallenge,
 link_provider linkProvider,link_subject linkSubject,link_attempts linkAttempts
 FROM autorizaciones_oauth WHERE code_hash=? AND consumed_at IS NULL AND expires_at>UTC_TIMESTAMP(3) FOR UPDATE`,
      [hash],
      executor,
    )
  )[0];
}
/** Registra intentos fallidos; la transacción debe confirmar este cambio antes del 401.
 * @param hash - Hash del token; evita persistir su valor legible.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function failedLink(hash: Buffer, executor: Executor) {
  return execute(
    'UPDATE autorizaciones_oauth SET link_attempts=link_attempts+1 WHERE code_hash=?',
    [hash],
    executor,
  );
}
/** Invalida un grant después del canje exitoso.
 * @param hash - Hash del token; evita persistir su valor legible.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function consumeGrant(hash: Buffer, executor: Executor) {
  return execute(
    'UPDATE autorizaciones_oauth SET consumed_at=UTC_TIMESTAMP(3) WHERE code_hash=?',
    [hash],
    executor,
  );
}
