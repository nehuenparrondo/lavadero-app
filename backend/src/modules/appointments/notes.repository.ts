import { execute, rows } from '../../utils/db.js';

/** Lee notas atribuidas a su autor, después de autorizar el turno en service.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns `Promise<import("mysql2").RowDataPacket[]>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function readNotes(id: string) {
  return rows(
    `SELECT CAST(n.id AS CHAR) id,n.body,n.created_at createdAt,CONCAT(u.first_name,' ',u.last_name) authorName
 FROM notas_turno n JOIN usuarios u ON u.id=n.author_id WHERE n.appointment_id=? ORDER BY n.id`,
    [id],
  );
}

/** Persiste una observación; el autor proviene de la sesión autenticada.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param authorId - Identificador del autor conservado en el historial.
 * @param body - Carga validada de la operación de escritura.
 * @returns `Promise<import("mysql2").ResultSetHeader>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function insertNote(id: string, authorId: string, body: string) {
  return execute('INSERT INTO notas_turno(appointment_id,author_id,body) VALUES(?,?,?)', [
    id,
    authorId,
    body,
  ]);
}
