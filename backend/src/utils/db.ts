import type { Pool, PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { database } from '../config/database.js';
import { AppError } from '../errors/AppError.js';

/** Ejecutor SQL utilizado exclusivamente por repositories e infraestructura. */
export type Executor = Pool | PoolConnection;
/** Obtiene infraestructura configurada. @throws AppError 503 cuando falta la base.
 * @returns `Pool`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function db(): Pool {
  if (!database)
    throw new AppError(503, 'DATABASE_UNAVAILABLE', 'El servicio está iniciándose.');
  return database;
}
/** Consulta parametrizada con filas tipadas. @throws Error del driver, manejado centralmente.
 * @param sql - Plantilla SQL; los valores del usuario van exclusivamente en placeholders.
 * @param values - Valores del formulario o parámetros que se serializan para la operación.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<T[]>`.
 */
export async function rows<T extends RowDataPacket>(
  sql: string,
  values: unknown[] = [],
  executor: Executor = db(),
): Promise<T[]> {
  const [result] = await executor.query<T[]>(sql, values);
  return result;
}
/** Escritura parametrizada. Nunca interpolar valores de usuarios dentro de sql.
 * @param sql - Plantilla SQL; los valores del usuario van exclusivamente en placeholders.
 * @param values - Valores del formulario o parámetros que se serializan para la operación.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<ResultSetHeader>`.
 */
export async function execute(sql: string, values: unknown[] = [], executor: Executor = db()) {
  const [result] = await executor.query<ResultSetHeader>(sql, values);
  return result;
}
