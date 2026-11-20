import { NotFoundError } from '../../errors/NotFoundError.js';
import type { Actor } from '../../types/domain.js';
import type { Executor } from '../../utils/db.js';
import { assertAppointmentAccess } from './appointments.access.js';
import { findAppointment } from './appointments.repository.js';
import { cancelSchema } from './appointments.schema.js';
import { recordCancellation } from './appointments.write.repository.js';
import { markCancellationRead, readCancellationNotices } from './cancellation.repository.js';
import { isoTime } from './schedule.js';

/** Guarda el motivo validado dentro de la misma transacción del cambio de estado.
 * @param id Turno bloqueado por la operación de cancelación.
 * @param actorId Autor obtenido de la sesión autenticada.
 * @param reason Motivo obligatorio; se normalizan espacios antes de guardarlo.
 * @param executor Conexión de la transacción que conserva estado, autor e historial.
 * @returns Resultado de persistir la cancelación; un rechazo revierte la transacción completa.
 */
export function saveCancellation(
  id: string,
  actorId: string,
  reason: string,
  executor: Executor,
) {
  return recordCancellation(id, actorId, cancelSchema.parse({ reason }).reason, executor);
}

/** Proyecta los avisos del cliente con fechas UTC del contrato REST.
 * @param actor Cliente autenticado por la ruta protegida.
 * @returns Avisos pendientes que sobreviven al cierre de sesión o cambio de dispositivo.
 */
export async function cancellationNotices(actor: Actor) {
  const notices = await readCancellationNotices(actor.id);
  return notices.map((notice) => ({
    ...notice,
    startsAt: isoTime(notice.startsAt),
    cancelledAt: isoTime(notice.cancelledAt),
  }));
}

/** Confirma lectura sin permitir acceder a avisos de otro cliente.
 * @param actor Cliente autenticado que confirma haber leído el aviso.
 * @param id Identificador validado del turno cancelado.
 * @returns Confirmación idempotente; conserva motivo, notas e historial del turno.
 */
export async function acknowledgeCancellation(actor: Actor, id: string) {
  const appointment = await findAppointment(id);
  assertAppointmentAccess(actor, appointment);
  if (
    appointment.status !== 'cancelled' ||
    appointment.cancelledById === actor.id ||
    !appointment.cancelledById
  )
    throw new NotFoundError();
  await markCancellationRead(id, actor.id);
  return { read: true };
}
