import type { Executor } from '../../utils/db.js';
import { execute, rows } from '../../utils/db.js';
/** Lista cobros del turno sin datos de autenticación.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<import("mysql2").RowDataPacket[]>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function listPayments(id: string, executor?: Executor) {
  return rows(
    `SELECT CAST(id AS CHAR) id,CAST(appointment_id AS CHAR) appointmentId,
 amount_cents amountCents,method,reference,paid_at paidAt,idempotency_key idempotencyKey FROM pagos WHERE appointment_id=? ORDER BY id`,
    [id],
    executor,
  );
}
/** Busca un reintento de cobro por clave global.
 * @param key - Clave estable del recurso o estado que se actualiza.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<import("mysql2").RowDataPacket | undefined>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function findPayment(key: string, executor: Executor) {
  return (
    await rows(
      `SELECT CAST(appointment_id AS CHAR) appointmentId,amount_cents amountCents,
 method,reference FROM pagos WHERE idempotency_key=?`,
      [key],
      executor,
    )
  )[0];
}
/** Inserta cobro bajo lock del turno; service valida saldo.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param actorId - Usuario autenticado que realizó el cambio para el historial de auditoría.
 * @param v - Datos tipados del elemento o formulario que se transforma.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<string>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function insertPayment(
  id: string,
  actorId: string,
  v: {
    amountCents: number;
    method: string;
    reference?: string | null | undefined;
    idempotencyKey: string;
  },
  executor: Executor,
) {
  return String(
    (
      await execute(
        'INSERT INTO pagos(appointment_id,recorded_by_id,amount_cents,method,reference,idempotency_key) VALUES(?,?,?,?,?,?)',
        [id, actorId, v.amountCents, v.method, v.reference ?? null, v.idempotencyKey],
        executor,
      )
    ).insertId,
  );
}
