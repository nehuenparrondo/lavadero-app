import type { Executor } from '../../utils/db.js';
import { execute } from '../../utils/db.js';

/** Vincula el vehículo ya validado sin cambiar los servicios ni el horario contratados.
 * @param id Turno bloqueado por el servicio.
 * @param vehicleId Vehículo propio de la categoría reservada.
 * @param executor Conexión que conserva el bloqueo común de agenda.
 * @returns Resultado SQL; incrementa version para identificar el cambio del turno.
 */
export function linkVehicle(id: string, vehicleId: string, executor: Executor) {
  return execute(
    'UPDATE turnos SET vehicle_id=?,version=version+1 WHERE id=?',
    [vehicleId, id],
    executor,
  );
}

/** Guarda la descripción de esta visita; no modifica los datos del garaje.
 * @param id Turno confirmado y autorizado por el servicio.
 * @param description Texto validado que se conserva como dato.
 * @param executor Conexión del bloqueo del turno.
 * @returns Resultado de insertar o actualizar la única descripción de ese turno.
 */
export function saveDescription(id: string, description: string, executor: Executor) {
  return execute(
    `INSERT INTO detalles_vehiculo_turno (appointment_id,description) VALUES (?,?)
       ON DUPLICATE KEY UPDATE description=?`,
    [id, description, description],
    executor,
  );
}

/** Oculta tarjetas propias del Inicio conservando reservas, pagos y auditoría.
 * @param clientId Cliente autenticado; no proviene del cuerpo del formulario.
 * @param from Inicio UTC del día local calculado por el servicio.
 * @param executor Conexión de la operación transaccional.
 * @returns Resultado SQL; affectedRows informa cuántas tarjetas se ocultaron.
 */
export function hideHomeAppointments(
  clientId: string,
  from: string | null,
  executor: Executor,
) {
  return execute(
    `UPDATE turnos a JOIN estados_turno s ON s.id=a.status_id
 SET a.home_hidden_at=UTC_TIMESTAMP(3) WHERE a.client_id=? AND a.home_hidden_at IS NULL
 AND a.starts_at>=? AND s.code IN ('confirmed','in_progress','awaiting_review')`,
    [clientId, from],
    executor,
  );
}
