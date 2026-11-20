import type { PoolConnection } from 'mysql2/promise';
import { lockMigrations } from './migration.repository.js';

/** Ejecuta una tarea bajo lock de esquema y libera el lock si la tarea falla.
 * @param connection - Conexión de sesión que adquiere y libera el lock.
 * @param task - Tarea de esquema ejecutada una vez adquirido el bloqueo de esta base.
 * @returns Promesa sin valor; libera el lock incluso si task falla y propaga ese error.
 */
export async function withMigrationLock(
  connection: PoolConnection,
  task: () => Promise<void>,
) {
  const key = await lockMigrations(connection);
  try {
    await task();
  } finally {
    await connection.execute('SELECT RELEASE_LOCK(?)', [key]);
  }
}
