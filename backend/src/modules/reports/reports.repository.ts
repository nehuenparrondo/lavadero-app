import { rows } from '../../utils/db.js';
/** Trabajos finalizados según fin agendado, no según la hora real del cierre.
 * @param from Inicio UTC inclusivo del período convertido por el servicio desde la zona del negocio.
 * @param to Fin UTC exclusivo; permite consultar días consecutivos sin contar dos veces el límite.
 * @returns Filas con turno, fin agendado y responsable, para agregar lavados por calendario local.
 */
export function completedWork(from: string, to: string) {
  return rows(
    `SELECT CAST(a.id AS CHAR) id,a.ends_at endsAt,CAST(a.employee_id AS CHAR) employeeId,
 CONCAT(u.first_name,' ',u.last_name) employeeName FROM turnos a JOIN estados_turno s ON s.id=a.status_id
 LEFT JOIN usuarios u ON u.id=a.employee_id WHERE s.code='completed' AND a.ends_at>=? AND a.ends_at<?`,
    [from, to],
  );
}
/** Cobros según el momento en que se registraron, sin multiplicarlos por servicios.
 * @param from Inicio UTC inclusivo del período convertido por el servicio desde la zona del negocio.
 * @param to Fin UTC exclusivo; permite consultar días consecutivos sin contar dos veces el límite.
 * @returns Importes enteros en centavos y su fecha de pago; reservar sin cobrar no genera ingreso.
 */
export function revenue(from: string, to: string) {
  return rows(
    'SELECT paid_at paidAt,amount_cents amountCents FROM pagos WHERE paid_at>=? AND paid_at<?',
    [from, to],
  );
}
/** Cuenta servicios contratados por inicio del turno y excluye cancelaciones.
 * @param from Inicio UTC inclusivo del período convertido por el servicio desde la zona del negocio.
 * @param to Fin UTC exclusivo; permite consultar días consecutivos sin contar dos veces el límite.
 * @returns Nombre histórico y cantidad de pedidos; editar el nombre del catálogo no reescribe el contrato.
 */
export function popularServices(from: string, to: string) {
  return rows(
    `SELECT i.applied_service_name name,COUNT(*) count FROM servicios_turno i
 JOIN turnos a ON a.id=i.appointment_id JOIN estados_turno s ON s.id=a.status_id WHERE s.code<>'cancelled'
 AND a.starts_at>=? AND a.starts_at<? GROUP BY i.applied_service_name ORDER BY count DESC`,
    [from, to],
  );
}
/** Cuenta la jornada compartida por estado e inicio, sin revelar ingresos del negocio.
 * @param from Inicio UTC inclusivo del período convertido por el servicio desde la zona del negocio.
 * @param to Fin UTC exclusivo; permite consultar días consecutivos sin contar dos veces el límite.
 * @returns Cantidad de turnos por estado; el resultado pertenece al equipo y no a un empleado en particular.
 */
export function employeeSummary(from: string, to: string) {
  return rows(
    `SELECT s.code status,COUNT(*) count FROM turnos a
 JOIN estados_turno s ON s.id=a.status_id WHERE a.starts_at>=? AND a.starts_at<? GROUP BY s.code`,
    [from, to],
  );
}
