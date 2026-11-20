import type { Executor } from '../../utils/db.js';
import { execute, rows } from '../../utils/db.js';
import type { RecoveryJob } from './recovery.types.js';
const fields = `SELECT id,correo email,CAST(usuario_id AS CHAR) userId,version_clave authVersion,
 nonce,token_hash tokenHash,estado status,intentos attempts,vence_en expiresAt,solicitado_en requestedAt
 FROM recuperaciones_clave`;
/** Consulta un token por hash; el bloqueo se toma después del usuario para evitar deadlocks.
 * @param hash - SHA-256 del secreto presentado.
 * @param executor - Conexión opcional de la transacción.
 * @param lock - Bloquea la fila durante el restablecimiento.
 * @returns Trabajo coincidente o undefined.
 */
export async function findRecovery(hash: Buffer, executor?: Executor, lock = false) {
  return (
    await rows<RecoveryJob>(
      fields + ' WHERE token_hash=?' + (lock ? ' FOR UPDATE' : ''),
      [hash],
      executor,
    )
  )[0];
}
/** Lee un trabajo después de bloquear primero la cuenta.
 * @param id - Identificador del trabajo.
 * @param executor - Transacción actual.
 * @returns Fila bloqueada.
 */
export async function lockRecovery(id: string, executor: Executor) {
  return (await rows<RecoveryJob>(fields + ' WHERE id=? FOR UPDATE', [id], executor))[0];
}
/** Asocia cuenta y versión de contraseña; el plazo nunca se renueva al reintentar.
 * @param job - Trabajo reclamado.
 * @param userId - Cuenta activa destinataria.
 * @param version - Versión actual de autenticación.
 * @param hash - Hash irreversible del token.
 * @param executor - Transacción actual.
 * @returns Promesa de persistencia.
 */
export async function prepareRecovery(
  job: RecoveryJob,
  userId: string,
  version: number,
  hash: Buffer,
  executor: Executor,
) {
  await execute(
    `UPDATE recuperaciones_clave SET usuario_id=?,version_clave=?,token_hash=?,
    vence_en=COALESCE(vence_en,DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 15 MINUTE)) WHERE id=?`,
    [userId, version, hash, job.id],
    executor,
  );
}
/** Inutiliza solicitudes antiguas de la cuenta al cambiar la contraseña.
 * @param job - Token consumido.
 * @param executor - Transacción actual.
 * @returns Promesa de persistencia.
 */
export async function consumeRecovery(job: RecoveryJob, executor: Executor) {
  await execute(
    `UPDATE recuperaciones_clave SET estado=IF(id=?,'usado','descartado'),
    usado_en=IF(id=?,UTC_TIMESTAMP(3),usado_en) WHERE correo=? AND solicitado_en<=UTC_TIMESTAMP(3)`,
    [job.id, job.id, job.email],
    executor,
  );
}
/** Descarta correo inexistente, cuenta inactiva o trabajo vencido sin filtrar la causa al público.
 * @param id - Trabajo que ya no debe entregarse.
 * @param executor - Conexión opcional de transacción.
 * @returns Promesa de persistencia.
 */
export async function discardRecovery(id: string, executor?: Executor) {
  await execute(
    "UPDATE recuperaciones_clave SET estado='descartado',bloqueo_hasta=NULL WHERE id=?",
    [id],
    executor,
  );
}
