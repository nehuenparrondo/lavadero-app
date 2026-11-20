import type { Executor } from '../../utils/db.js';
import { execute } from '../../utils/db.js';
import type { AppointmentStatus, QuoteItem } from './appointments.types.js';
/** Inserta turno pendiente. El llamador mantiene lock de agenda y snapshot de precios.
 * @param v - Datos tipados del elemento o formulario que se transforma.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<string>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function insertAppointment(
  v: {
    clientId: string | null;
    vehicleId: string | null;
    vehicleTypeId: string;
    startsAt: string;
    endsAt: string;
    createdById: string;
    currencyCode: string;
  },
  executor: Executor,
) {
  return String(
    (
      await execute(
        `INSERT INTO turnos(client_id,vehicle_id,reserved_vehicle_type_id,status_id,starts_at,ends_at,created_by_id,currency_code)
 SELECT ?,?,?,id,?,?,?,? FROM estados_turno WHERE code='pending'`,
        [
          v.clientId,
          v.vehicleId,
          v.vehicleTypeId,
          v.startsAt,
          v.endsAt,
          v.createdById,
          v.currencyCode,
        ],
        executor,
      )
    ).insertId,
  );
}
/** Guarda snapshot de cada servicio.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param items - Renglones tipados que conservan precio, nombre y duración del contrato.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<void>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function insertItems(id: string, items: QuoteItem[], executor: Executor) {
  for (const item of items)
    await execute(
      `INSERT INTO servicios_turno
 (appointment_id,service_id,applied_price_cents,applied_duration_minutes,applied_service_name) VALUES(?,?,?,?,?)`,
      [id, item.serviceId, item.priceCents, item.durationMinutes, item.name],
      executor,
    );
}
/** Cambia estado incrementando versión; las reglas viven en service.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param status - Estado solicitado; el servicio comprueba si la transición está permitida.
 * @param actorId - Usuario autenticado que realizó el cambio para el historial de auditoría.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<void>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function setStatus(
  id: string,
  status: AppointmentStatus,
  actorId: string,
  executor: Executor,
) {
  await execute(
    'UPDATE turnos SET status_id=(SELECT id FROM estados_turno WHERE code=?),version=version+1 WHERE id=?',
    [status, id],
    executor,
  );
  await execute(
    'INSERT INTO historial_estados_turno(appointment_id,status_id,changed_by_id) SELECT ?,id,? FROM estados_turno WHERE code=?',
    [id, actorId, status],
    executor,
  );
}
/** Asignación administrativa.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param employeeId - Empleado activo que se asigna o consulta.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function setEmployee(id: string, employeeId: string, executor: Executor) {
  return execute(
    'UPDATE turnos SET employee_id=?,version=version+1 WHERE id=?',
    [employeeId, id],
    executor,
  );
}
/** Autor y motivo de cancelación.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param actorId - Usuario autenticado que realizó el cambio para el historial de auditoría.
 * @param reason - Motivo de cancelación conservado en el historial.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function recordCancellation(
  id: string,
  actorId: string,
  reason: string,
  executor: Executor,
) {
  return execute(
    'UPDATE turnos SET cancelled_by_id=?,cancellation_reason=? WHERE id=?',
    [actorId, reason, id],
    executor,
  );
}
