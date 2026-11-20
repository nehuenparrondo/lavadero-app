import type { RowDataPacket } from 'mysql2/promise';
import type { Executor } from '../../utils/db.js';
import { execute, rows } from '../../utils/db.js';

/** Consulta la categoría de una cotización o una tarifa.
 * @param id Identificador del tipo.
 * @param executor Conexión de la operación que necesita una lectura consistente.
 * @returns Tipo, si existe.
 */
export async function findType(id: string, executor?: Executor) {
  return (
    await rows<RowDataPacket & { code: string; isActive: number }>(
      'SELECT code,is_active isActive FROM tipos_vehiculo WHERE id=?',
      [id],
      executor,
    )
  )[0];
}
/** Lista tipos de vehículo con ID string.
 * @param admin - Habilita controles de gestión; el servidor conserva la autorización real.
 * @returns `Promise<import("mysql2").RowDataPacket[]>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function listTypes(admin: boolean) {
  return rows(
    'SELECT CAST(id AS CHAR) id,code,name,is_active isActive FROM tipos_vehiculo WHERE (? OR is_active=TRUE) ORDER BY id',
    [admin],
  );
}
/** Crea tipo y devuelve ID.
 * @param v - Datos tipados del elemento o formulario que se transforma.
 * @param executor - Transacción de categoría y tarifas.
 * @returns `Promise<string>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function insertType(
  v: { code: string; name: string; isActive: boolean },
  executor?: Executor,
) {
  return String(
    (
      await execute(
        'INSERT INTO tipos_vehiculo(code,name,is_active) VALUES(?,?,?)',
        [v.code, v.name, v.isActive],
        executor,
      )
    ).insertId,
  );
}
/** Edita tipo.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param v - Datos tipados del elemento o formulario que se transforma.
 * @param executor - Transacción de categoría y tarifas.
 * @returns `Promise<import("mysql2").ResultSetHeader>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function updateType(
  id: string,
  v: { code: string; name: string; isActive: boolean },
  executor?: Executor,
) {
  return execute(
    'UPDATE tipos_vehiculo SET code=?,name=?,is_active=? WHERE id=?',
    [v.code, v.name, v.isActive, id],
    executor,
  );
}
/** Baja lógica del tipo.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns `Promise<import("mysql2").ResultSetHeader>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function deactivateType(id: string) {
  return execute('UPDATE tipos_vehiculo SET is_active=FALSE WHERE id=?', [id]);
}
