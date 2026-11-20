import type { RowDataPacket } from 'mysql2/promise';
import type { Executor } from '../../utils/db.js';
import { execute, rows } from '../../utils/db.js';
/** Servicio de catálogo. */
export interface Service extends RowDataPacket {
  id: string;
  code: string;
  name: string;
  description: string;
  durationMinutes: number;
  isActive: number;
}
const select =
  'SELECT CAST(id AS CHAR) id,code,name,description,duration_minutes durationMinutes,is_active isActive FROM servicios';
/** Lee catálogo sin borrar historia; admin puede incluir inactivos.
 * @param includeInactive - Incluye inactivos únicamente en la consulta que lo permite.
 * @returns `Promise<Service[]>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function listServices(includeInactive: boolean) {
  return rows<Service>(
    select + ' WHERE deleted_at IS NULL AND (? OR is_active=TRUE) ORDER BY id',
    [includeInactive],
  );
}
/** Busca servicio por ID.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<Service | undefined>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function findService(id: string, executor?: Executor) {
  return (
    await rows<Service>(select + ' WHERE id=? AND deleted_at IS NULL', [id], executor)
  )[0];
}
/** Precios vigentes, agrupables por tipo en el servicio.
 * @returns `Promise<RowDataPacket[]>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function listPrices() {
  return rows<RowDataPacket>(
    `SELECT CAST(p.service_id AS CHAR) serviceId,CAST(p.vehicle_type_id AS CHAR) vehicleTypeId,p.price_cents priceCents
     FROM tarifas_servicio p JOIN tipos_vehiculo t ON t.id=p.vehicle_type_id JOIN servicios s ON s.id=p.service_id
     WHERE (t.code='motorcycle') = (s.code='motorcycle_wash')`,
  );
}
/** Inserta un servicio de catálogo validado.
 * @param v - Datos tipados del elemento o formulario que se transforma.
 * @returns `Promise<string>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function insertService(v: {
  code: string;
  name: string;
  description: string;
  durationMinutes: number;
  isActive: boolean;
}) {
  return String(
    (
      await execute(
        'INSERT INTO servicios(code,name,description,duration_minutes,is_active) VALUES(?,?,?,?,?)',
        [v.code, v.name, v.description, v.durationMinutes, v.isActive],
      )
    ).insertId,
  );
}
/** Actualiza datos sin modificar snapshots de turnos previos.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param v - Datos tipados del elemento o formulario que se transforma.
 * @returns `Promise<void>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function updateService(
  id: string,
  v: {
    code: string;
    name: string;
    description: string;
    durationMinutes: number;
    isActive: boolean;
  },
) {
  await execute(
    'UPDATE servicios SET code=?,name=?,description=?,duration_minutes=?,is_active=? WHERE id=?',
    [v.code, v.name, v.description, v.durationMinutes, v.isActive, id],
  );
}
/** Desactiva y borra lógicamente un servicio.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function removeService(id: string) {
  return execute(
    'UPDATE servicios SET is_active=FALSE,deleted_at=UTC_TIMESTAMP(3) WHERE id=?',
    [id],
  );
}
/** Upsert de un precio vigente por par servicio/tipo.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param typeId - Tipo de vehículo para resolver su tarifa vigente.
 * @param cents - Importe entero en centavos ARS.
 * @param executor - Transacción del tipo de vehículo si se guardan varias tarifas juntas.
 * @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function savePrice(id: string, typeId: string, cents: number, executor?: Executor) {
  return execute(
    `INSERT INTO tarifas_servicio(service_id,vehicle_type_id,price_cents)
 VALUES(?,?,?) ON DUPLICATE KEY UPDATE price_cents=?`,
    [id, typeId, cents, cents],
    executor,
  );
}
