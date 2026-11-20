import type { RowDataPacket } from 'mysql2/promise';
import type { Executor } from '../../utils/db.js';
import { execute, rows } from '../../utils/db.js';

const messageFrom = ` FROM mensajes_cliente m JOIN usuarios c ON c.id=m.client_id
 LEFT JOIN partes_lavado w ON w.id=m.submission_id LEFT JOIN turnos a ON a.id=w.appointment_id
 LEFT JOIN vehiculos v ON v.id=a.vehicle_id`;

/** Bandeja paginada. clientId nulo corresponde únicamente a Administración.
 * @param clientId - Titular opcional; state, page y limit delimitan la consulta.
 * @returns Mensajes y metadatos de paginación.
 */
export async function listMessages(
  clientId: string | null,
  state: string | undefined,
  page: number,
  limit: number,
) {
  const where =
    ' WHERE (? IS NULL OR m.client_id=?)' +
    (state === 'open'
      ? ' AND m.resolved_at IS NULL'
      : state === 'resolved'
        ? ' AND m.resolved_at IS NOT NULL'
        : '');
  const params = [clientId, clientId];
  const items = await rows(
    `SELECT CAST(m.id AS CHAR) id,m.kind,m.body,m.created_at createdAt,m.resolved_at resolvedAt,m.reply,
    CONCAT(c.first_name,' ',c.last_name) clientName,CAST(w.appointment_id AS CHAR) appointmentId,
    v.plate,w.employee_name employeeName,w.description workDescription` +
      messageFrom +
      where +
      ' ORDER BY m.id DESC LIMIT ? OFFSET ?',
    [...params, limit, (page - 1) * limit],
  );
  const [result] = await rows<RowDataPacket & { total: number }>(
    'SELECT COUNT(*) total FROM mensajes_cliente m' + where,
    params,
  );
  return { items, total: Number(result?.total ?? 0), page, limit };
}

/** Persiste el caso con la identidad autenticada y un vínculo al parte aprobado si corresponde.
 * @param clientId - Autor autenticado; kind, body y submissionId describen el caso.
 * @returns Resultado SQL con el identificador generado.
 */
export function insertMessage(
  clientId: string,
  kind: 'complaint' | 'feedback',
  body: string,
  submissionId: string | null,
  executor?: Executor,
) {
  return execute(
    'INSERT INTO mensajes_cliente (client_id,kind,body,submission_id) VALUES (?,?,?,?)',
    [clientId, kind, body, submissionId],
    executor,
  );
}

/** Resuelve una sola vez; dos administradores no se pisan la respuesta.
 * @param id - Mensaje, junto con el administrador y su respuesta.
 * @returns Resultado SQL; cero filas si el caso está cerrado o ausente.
 */
export function resolveMessage(id: string, adminId: string, reply: string) {
  return execute(
    'UPDATE mensajes_cliente SET resolved_at=UTC_TIMESTAMP(3),resolved_by_id=?,reply=? WHERE id=? AND resolved_at IS NULL',
    [adminId, reply, id],
  );
}
