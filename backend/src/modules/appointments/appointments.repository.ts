import type { RowDataPacket } from 'mysql2/promise';
import type { Executor } from '../../utils/db.js';
import { rows } from '../../utils/db.js';
import type { Appointment, BookingIntervalRow, QuoteItem } from './appointments.types.js';
const agendaFrom = ` FROM turnos a JOIN estados_turno s ON s.id=a.status_id
 LEFT JOIN vehiculos v ON v.id=a.vehicle_id LEFT JOIN ingresos_sin_turno w ON w.appointment_id=a.id`;
const select = `SELECT CAST(a.id AS CHAR) id,CAST(a.client_id AS CHAR) clientId,CAST(a.employee_id AS CHAR) employeeId,
 CAST(a.vehicle_id AS CHAR) vehicleId,s.code status,a.starts_at startsAt,a.ends_at endsAt,a.currency_code currencyCode,a.version,
 COALESCE(v.plate,w.plate) plate,COALESCE(v.brand,w.brand) brand,COALESCE(v.model,w.model) model,
 COALESCE(v.color,w.color) color,(w.appointment_id IS NOT NULL) isWalkIn,
 t.name vehicleType,CAST(t.id AS CHAR) vehicleTypeId,d.description vehicleDescription,
 a.cancellation_reason cancellationReason,CAST(a.cancelled_by_id AS CHAR) cancelledById,
 CONCAT(canceller.first_name,' ',canceller.last_name) cancelledByName,
 COALESCE(NULLIF(w.customer_name,''),CONCAT(c.first_name,' ',c.last_name),'Cliente presencial') clientName,
 COALESCE(w.customer_phone,c.phone) clientPhone,
 CONCAT(e.first_name,' ',e.last_name) employeeName,
 COALESCE(e.is_active AND e.deleted_at IS NULL AND er.code='employee',FALSE) employeeAvailable,
 COALESCE((SELECT GROUP_CONCAT(applied_service_name ORDER BY service_id SEPARATOR ' · ') FROM servicios_turno WHERE appointment_id=a.id),'') serviceSummary,
 COALESCE((SELECT SUM(applied_price_cents) FROM servicios_turno WHERE appointment_id=a.id),0) totalCents,
 COALESCE((SELECT SUM(amount_cents) FROM pagos WHERE appointment_id=a.id),0) paidCents
 ${agendaFrom} JOIN tipos_vehiculo t ON t.id=COALESCE(a.reserved_vehicle_type_id,v.vehicle_type_id)
 LEFT JOIN usuarios c ON c.id=a.client_id LEFT JOIN usuarios e ON e.id=a.employee_id
 LEFT JOIN roles er ON er.id=e.role_id LEFT JOIN usuarios canceller ON canceller.id=a.cancelled_by_id
 LEFT JOIN detalles_vehiculo_turno d ON d.appointment_id=a.id`;
/** Busca un turno sin revelar datos fuera del servicio autorizado.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @param lock - Si es verdadero, bloquea la fila hasta el final de la transacción.
 * @returns `Promise<Appointment | undefined>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function findAppointment(id: string, executor?: Executor, lock = false) {
  if (lock) await rows('SELECT id FROM turnos WHERE id=? FOR UPDATE', [id], executor);
  return (await rows<Appointment>(select + ' WHERE a.id=?', [id], executor))[0];
}
/** Lista mediante condiciones SQL construidas exclusivamente en el repositorio de filtros, nunca desde input libre.
 * @param filter - Predicados cerrados construidos por el repositorio de filtros.
 * @param values - Valores del formulario o parámetros que se serializan para la operación.
 * @param page - Número de página desde uno.
 * @param limit - Cantidad máxima de filas permitida por el esquema de paginación.
 * @param order - Orden permitido ASC o DESC; nunca se acepta SQL libre.
 * @returns `Promise<{ items: Appointment[]; total: number; page: number; limit: number; }>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function listAppointments(
  filter: string,
  values: unknown[],
  page: number,
  limit: number,
  order: 'ASC' | 'DESC' | 'NEWEST' = 'DESC',
) {
  const sorting =
    order === 'NEWEST' ? 'a.created_at DESC,a.id DESC' : `a.starts_at ${order},a.id ${order}`;
  const items = await rows<Appointment>(
    select + filter + ` ORDER BY ${sorting} LIMIT ? OFFSET ?`,
    [...values, limit, (page - 1) * limit],
  );
  const count = await rows<RowDataPacket>(
    'SELECT COUNT(*) total' + agendaFrom + filter,
    values,
  );
  return { items, total: Number(count[0]?.total ?? 0), page, limit };
}
/** Obtiene precios activos para todos los servicios de una cotización.
 * @param ids - Identificadores de servicios seleccionados, únicos y validados.
 * @param typeId - Tipo de vehículo para resolver su tarifa vigente.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<QuoteItem[]>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function quoteServices(ids: string[], typeId: string, executor?: Executor) {
  return rows<QuoteItem>(
    `SELECT CAST(s.id AS CHAR) serviceId,s.name,s.code,
 s.duration_minutes durationMinutes,p.price_cents priceCents FROM servicios s JOIN tarifas_servicio p ON p.service_id=s.id
 WHERE s.id IN (?) AND p.vehicle_type_id=? AND s.is_active=TRUE AND s.deleted_at IS NULL`,
    [ids, typeId],
    executor,
  );
}
/** Intervalos que intersectan una ventana. Reservas canceladas no ocupan capacidad.
 * @param start - Inicio UTC en formato SQL; extremo incluido.
 * @param end - Fin UTC en formato SQL; extremo excluido.
 * @param excludeId - Turno que debe excluirse al comprobar una reasignación o cambio de estado.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<BookingIntervalRow[]>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function overlapping(
  start: string,
  end: string,
  excludeId: string | undefined,
  executor?: Executor,
) {
  return rows<BookingIntervalRow>(
    `SELECT CAST(a.id AS CHAR) id,
 a.starts_at startsAt,a.ends_at endsAt,CAST(a.employee_id AS CHAR) employeeId,
 CAST(COALESCE(a.vehicle_id,(SELECT v2.id FROM vehiculos v2 WHERE v2.plate=w.plate LIMIT 1)) AS CHAR) vehicleId
 FROM turnos a JOIN estados_turno s ON s.id=a.status_id
 LEFT JOIN ingresos_sin_turno w ON w.appointment_id=a.id
 WHERE s.code IN ('pending','confirmed','in_progress','awaiting_review','completed')
 AND a.starts_at<? AND a.ends_at>? AND (? IS NULL OR a.id<>?)`,
    [end, start, excludeId ?? null, excludeId ?? null],
    executor,
  );
}
export {
  insertAppointment,
  insertItems,
  recordCancellation,
  setEmployee,
  setStatus,
} from './appointments.write.repository.js';
/** Lee servicios históricos.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns `Promise<RowDataPacket[]>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function readItems(id: string) {
  return rows(
    `SELECT CAST(service_id AS CHAR) serviceId,applied_service_name name,applied_price_cents priceCents,
 applied_duration_minutes durationMinutes FROM servicios_turno WHERE appointment_id=?`,
    [id],
  );
}
