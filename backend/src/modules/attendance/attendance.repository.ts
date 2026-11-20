import type { Executor } from '../../utils/db.js';
import { execute, rows } from '../../utils/db.js';

/** Muestra el plantel activo para el día actual e incluye fichajes históricos aunque cambie el plantel.
 * @param date - Fecha local del negocio en formato YYYY-MM-DD.
 * @param currentDay - Incluye empleados activos aún sin fichaje solo cuando se consulta hoy.
 * @returns Filas del plantel y de la asistencia.
 */
export function readAttendance(date: string, currentDay: boolean) {
  return rows(
    `SELECT CAST(u.id AS CHAR) employeeId,COALESCE(f.employee_name,CONCAT(u.first_name,' ',u.last_name)) employeeName,
       f.arrived_at arrivedAt,CONCAT(a.first_name,' ',a.last_name) recordedByName
     FROM usuarios u JOIN roles r ON r.id=u.role_id
     LEFT JOIN asistencia_empleados f ON f.employee_id=u.id AND f.work_date=?
     LEFT JOIN usuarios a ON a.id=f.recorded_by_id
     WHERE f.employee_id IS NOT NULL OR (? AND r.code='employee' AND u.is_active AND u.deleted_at IS NULL)
     ORDER BY employeeName,u.id`,
    [date, currentDay],
  );
}

/** El primer fichaje del día prevalece ante clics duplicados o simultáneos.
 * @param date - Día local del negocio validado por el servicio.
 * @param employeeId - Empleado activo cuya llegada se registra.
 * @param adminId - Administrador que observó y registra la llegada.
 * @param executor - Conexión de la transacción; el primer fichaje del día prevalece.
 * @returns Resultado SQL del fichaje.
 */
export function insertArrival(
  date: string,
  employeeId: string,
  adminId: string,
  executor: Executor,
) {
  return execute(
    `INSERT INTO asistencia_empleados (employee_id,work_date,employee_name,arrived_at,recorded_by_id)
     SELECT id,?,CONCAT(first_name,' ',last_name),UTC_TIMESTAMP(3),? FROM usuarios WHERE id=?
     ON DUPLICATE KEY UPDATE arrived_at=asistencia_empleados.arrived_at`,
    [date, adminId, employeeId],
    executor,
  );
}
