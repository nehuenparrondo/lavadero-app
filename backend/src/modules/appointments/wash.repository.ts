import type { RowDataPacket } from 'mysql2/promise';
import type { Executor } from '../../utils/db.js';
import { execute, rows } from '../../utils/db.js';

/** El parte guarda el responsable real, su declaración y la decisión administrativa. */
export interface WashSubmission extends RowDataPacket {
  id: string;
  employeeName: string;
  description: string;
  submittedAt: string;
  decision: 'approved' | 'returned' | null;
  reviewNote: string | null;
  reviewedAt: string | null;
  reviewerName: string | null;
  feedbackId: string | null;
  completedByEmployee: number;
}

/** Lee el último intento. Las devoluciones anteriores quedan en el historial SQL.
 * @param id - Turno cuyo último parte se consulta.
 * @param executor - Conexión opcional; permite leer bajo el bloqueo de la operación actual.
 * @returns Último parte con decisión y devolución asociada si existen.
 */
export async function latestWash(id: string, executor?: Executor) {
  return (
    await rows<WashSubmission>(
      `SELECT CAST(w.id AS CHAR) id,w.employee_name employeeName,w.description,w.submitted_at submittedAt,
      w.decision,w.completed_by_employee completedByEmployee,w.review_note reviewNote,w.reviewed_at reviewedAt,
      CONCAT(u.first_name,' ',u.last_name) reviewerName,CAST(m.id AS CHAR) feedbackId
    FROM partes_lavado w LEFT JOIN usuarios u ON u.id=w.reviewed_by_id
    LEFT JOIN mensajes_cliente m ON m.submission_id=w.id
    WHERE w.appointment_id=? ORDER BY w.id DESC LIMIT 1`,
      [id],
      executor,
    )
  )[0];
}

/** Crea un parte inmutable bajo el mismo bloqueo que el estado del turno.
 * @param id - Turno en proceso al que pertenece el parte.
 * @param employeeId - Cuenta responsable cuyo nombre se conserva junto al trabajo.
 * @param description - Declaración del trabajo realizado; no reemplaza partes anteriores.
 * @param executor - Conexión transaccional que mantiene el bloqueo del turno.
 * @returns Resultado SQL de la inserción.
 */
export function submitWash(
  id: string,
  employeeId: string,
  description: string,
  executor: Executor,
) {
  return execute(
    `INSERT INTO partes_lavado (appointment_id,employee_id,employee_name,description,submitted_at)
    SELECT ?,id,CONCAT(first_name,' ',last_name),?,UTC_TIMESTAMP(3) FROM usuarios WHERE id=?`,
    [id, description, employeeId],
    executor,
  );
}

/** Registra quién revisó un parte y cuándo, conservando descripción y autor originales.
 * @param submissionId - Identificador exacto del parte aún sin decisión.
 * @param reviewerId - Administrador que registra la revisión.
 * @param decision - Aprobación o devolución del parte seleccionado.
 * @param note - Explicación opcional de la revisión; se guarda como NULL si falta.
 * @param executor - Conexión de la misma transacción que cambia el estado del turno.
 * @returns Resultado SQL del cambio de revisión.
 */
export function recordReview(
  submissionId: string,
  reviewerId: string,
  decision: 'approved' | 'returned',
  note: string | undefined,
  executor: Executor,
) {
  return execute(
    `UPDATE partes_lavado SET decision=?,review_note=?,reviewed_by_id=?,reviewed_at=UTC_TIMESTAMP(3)
     WHERE id=? AND decision IS NULL`,
    [decision, note ?? null, reviewerId, submissionId],
    executor,
  );
}

/** Identifica el cierre directo del empleado sin fingir una revisión administrativa.
 * @param id Parte recién insertado por la misma operación de cierre.
 * @param executor Conexión que conserva los bloqueos de agenda y turno.
 * @returns Resultado SQL; la escritura se confirma junto al cambio de estado del turno.
 */
export function markEmployeeCompleted(id: number, executor: Executor) {
  return execute(
    'UPDATE partes_lavado SET completed_by_employee=TRUE WHERE id=?',
    [id],
    executor,
  );
}
