import type { RowDataPacket } from 'mysql2/promise';
import type { Executor } from '../../utils/db.js';
import { rows } from '../../utils/db.js';
import { setEmployee } from './appointments.write.repository.js';

/** Asigna un empleado activo y libre, dando prioridad a quien lleva más tiempo sin asignación.
 * @param id - Turno a asignar; startsAt y endsAt están en UTC. connection mantiene el bloqueo de agenda.
 * @returns Promesa que termina aunque no haya un empleado libre.
 */
export async function assignAvailableEmployee(
  id: string,
  startsAt: string,
  endsAt: string,
  connection: Executor,
) {
  const [employee] = await rows<RowDataPacket & { id: string }>(
    `SELECT CAST(u.id AS CHAR) id FROM usuarios u JOIN roles r ON r.id=u.role_id
    WHERE r.code='employee' AND u.is_active AND u.deleted_at IS NULL
    AND NOT EXISTS (
      SELECT 1 FROM turnos a JOIN estados_turno s ON s.id=a.status_id
      WHERE a.employee_id=u.id AND a.id<>? AND a.starts_at<? AND a.ends_at>?
      AND s.code IN ('pending','confirmed','in_progress')
    )
    ORDER BY (SELECT COALESCE(MAX(a.id),0) FROM turnos a WHERE a.employee_id=u.id), u.id
    LIMIT 1`,
    [id, endsAt, startsAt],
    connection,
  );
  if (employee) await setEmployee(id, employee.id, connection);
}
