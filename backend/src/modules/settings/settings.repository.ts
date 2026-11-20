import type { RowDataPacket } from 'mysql2/promise';
import type { Executor } from '../../utils/db.js';
import { execute, rows } from '../../utils/db.js';
/** Configuración interna de una sucursal. */
export interface Settings extends RowDataPacket {
  currencyCode: string;
  /** Zona IANA del negocio para horarios de atención y fechas de reportes. */
  timeZone: string;
  cancellationNoticeMinutes: number;
  simultaneousCapacity: number;
  slotStepMinutes: number;
}
/** Horario local por día ISO. */
export interface BusinessHour extends RowDataPacket {
  weekday: number;
  opensAt: string;
  closesAt: string;
}
const select = `SELECT currency_code currencyCode,time_zone timeZone,cancellation_notice_minutes cancellationNoticeMinutes,
 simultaneous_capacity simultaneousCapacity,slot_step_minutes slotStepMinutes FROM configuracion_negocio WHERE id=1`;
/** Lee configuración o bloquea la fila común para serializar cambios de agenda y reservas.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @param lock - Si es verdadero, bloquea la fila hasta el final de la transacción.
 * @returns `Promise<Settings | undefined>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function readSettings(executor?: Executor, lock = false) {
  return (await rows<Settings>(select + (lock ? ' FOR UPDATE' : ''), [], executor))[0];
}
/** Lee días abiertos, sin filas para días cerrados.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<BusinessHour[]>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function readHours(executor?: Executor) {
  return rows<BusinessHour>(
    'SELECT weekday,opens_at opensAt,closes_at closesAt FROM horarios_atencion ORDER BY weekday',
    [],
    executor,
  );
}
/** Guarda parámetros bajo la misma transacción de horario.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<void>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function updateSettings(
  input: {
    timeZone: string;
    cancellationNoticeMinutes: number;
    simultaneousCapacity: number;
    slotStepMinutes: number;
  },
  executor: Executor,
) {
  await execute(
    'UPDATE configuracion_negocio SET time_zone=?,cancellation_notice_minutes=?,simultaneous_capacity=?,slot_step_minutes=? WHERE id=1',
    [
      input.timeZone,
      input.cancellationNoticeMinutes,
      input.simultaneousCapacity,
      input.slotStepMinutes,
    ],
    executor,
  );
}
/** Reemplaza la semana completa de forma atómica.
 * @param hours - Días y horarios de atención en la zona del negocio.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<void>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function updateHours(
  hours: { weekday: number; opensAt: string; closesAt: string }[],
  executor: Executor,
) {
  await execute('DELETE FROM horarios_atencion', [], executor);
  for (const h of hours)
    await execute(
      'INSERT INTO horarios_atencion(weekday,opens_at,closes_at) VALUES(?,?,?)',
      [h.weekday, h.opensAt, h.closesAt],
      executor,
    );
}
