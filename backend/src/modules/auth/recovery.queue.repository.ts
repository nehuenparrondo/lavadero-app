import { randomBytes, randomUUID } from 'node:crypto';
import { execute, rows } from '../../utils/db.js';
import { transaction } from '../../utils/transaction.js';
import { tokenHash } from './token.service.js';
import type { RecoveryJob } from './recovery.types.js';
/** Cola con límite transaccional de tres solicitudes por correo y hora, exista o no.
 * @param email - Correo normalizado, tratado siempre del mismo modo.
 * @returns Promesa resuelta después de persistir o aplicar el límite silencioso.
 */
export async function enqueueRecovery(email: string) {
  await transaction(async (connection) => {
    const hash = tokenHash(email);
    await execute(
      `INSERT INTO limites_recuperacion(correo_hash,ventana,intentos) VALUES(?,UTC_TIMESTAMP(3),1)
      ON DUPLICATE KEY UPDATE intentos=IF(ventana<DATE_SUB(UTC_TIMESTAMP(3),INTERVAL 1 HOUR),1,intentos+1),
      ventana=IF(ventana<DATE_SUB(UTC_TIMESTAMP(3),INTERVAL 1 HOUR),UTC_TIMESTAMP(3),ventana)`,
      [hash],
      connection,
    );
    const [limit] = await rows(
      'SELECT intentos FROM limites_recuperacion WHERE correo_hash=? FOR UPDATE',
      [hash],
      connection,
    );
    if (Number(limit?.intentos) > 3) return;
    await execute(
      'INSERT INTO recuperaciones_clave(id,correo,nonce) VALUES(?,?,?)',
      [randomUUID(), email, randomBytes(32)],
      connection,
    );
  });
}
/** Reclama un trabajo con arrendamiento recuperable después de reiniciar el servidor.
 * @returns Un trabajo privado o undefined si no hay pendientes.
 */
export function claimRecovery() {
  return transaction(async (connection) => {
    const [job] = await rows<RecoveryJob>(
      `SELECT id,correo email,nonce,intentos attempts
      FROM recuperaciones_clave WHERE intentos<3 AND proximo_intento<=UTC_TIMESTAMP(3)
      AND (estado='pendiente' OR (estado='procesando' AND bloqueo_hasta<UTC_TIMESTAMP(3)))
      ORDER BY solicitado_en LIMIT 1 FOR UPDATE`,
      [],
      connection,
    );
    if (!job) return undefined;
    await execute(
      `UPDATE recuperaciones_clave SET estado='procesando',intentos=intentos+1,
      bloqueo_hasta=DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 60 SECOND) WHERE id=?`,
      [job.id],
      connection,
    );
    return job;
  });
}
/** Finaliza o reprograma sin guardar respuestas remotas que puedan contener secretos.
 * @param id - ID reclamado por el trabajador.
 * @param success - Mailtrap aceptó el mensaje.
 * @returns Promesa de persistencia.
 */
export async function finishDelivery(id: string, success: boolean) {
  await execute(
    `UPDATE recuperaciones_clave SET estado=IF(?,'enviado',IF(intentos>=3,'descartado','pendiente')),
    enviado_en=IF(?,UTC_TIMESTAMP(3),enviado_en),bloqueo_hasta=NULL,
    proximo_intento=DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 30 SECOND),ultimo_error=IF(?,NULL,'DELIVERY_FAILED')
    WHERE id=? AND estado='procesando'`,
    [success, success, success, id],
  );
}
