import type { RowDataPacket } from 'mysql2/promise';
import { execute, rows } from '../../utils/db.js';

/** Aviso propio pendiente de lectura; el motivo proviene del turno cancelado. */
export interface CancellationNotice extends RowDataPacket {
  id: string;
  startsAt: string;
  cancelledAt: string;
  reason: string | null;
  plate: string | null;
  vehicleType: string;
}

/** Consulta los avisos propios sin duplicar motivos ni depender del almacenamiento del teléfono.
 * @param userId Cliente autenticado, nunca elegido desde parámetros públicos.
 * @returns Hasta diez cancelaciones del equipo pendientes de lectura, más recientes primero.
 */
export function readCancellationNotices(userId: string) {
  return rows<CancellationNotice>(
    `SELECT CAST(a.id AS CHAR) id,a.starts_at startsAt,a.cancellation_reason reason,v.plate,t.name vehicleType,
     COALESCE((SELECT MAX(h.created_at) FROM historial_estados_turno h
       WHERE h.appointment_id=a.id AND h.status_id=a.status_id),a.updated_at) cancelledAt
     FROM turnos a JOIN estados_turno s ON s.id=a.status_id
     LEFT JOIN vehiculos v ON v.id=a.vehicle_id
     JOIN tipos_vehiculo t ON t.id=COALESCE(a.reserved_vehicle_type_id,v.vehicle_type_id)
     WHERE a.client_id=? AND s.code='cancelled' AND a.cancelled_by_id<>a.client_id
       AND a.cancellation_read_at IS NULL ORDER BY cancelledAt DESC,a.id DESC LIMIT 10`,
    [userId],
  );
}

/** Marca un aviso propio como leído; repetirlo conserva la primera confirmación.
 * @param id Turno cancelado cuya propiedad ya comprobó el servicio.
 * @param userId Titular autenticado del turno.
 * @returns Resultado de la escritura persistente, sin borrar el motivo ni el historial.
 */
export function markCancellationRead(id: string, userId: string) {
  return execute(
    `UPDATE turnos SET cancellation_read_at=COALESCE(cancellation_read_at,CURRENT_TIMESTAMP(3))
     WHERE id=? AND client_id=? AND cancelled_by_id<>client_id`,
    [id, userId],
  );
}
