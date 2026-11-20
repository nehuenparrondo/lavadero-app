import type { PoolConnection } from 'mysql2/promise';
import { db } from './db.js';

/** Ejecuta el caso de uso en una conexión y siempre libera el recurso.
 * @param operation Trabajo cuyas escrituras deben reutilizar la conexión recibida.
 * @returns Resultado de operation después del commit.
 * @throws Error Conserva el fallo de la operación o del driver después del rollback.
 */
export async function transaction<T>(
  operation: (connection: PoolConnection) => Promise<T>,
): Promise<T> {
  const connection = await db().getConnection();
  try {
    await connection.beginTransaction();
    const result = await operation(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
