import type { PoolConnection } from 'mysql2/promise';
import { lockMigrations } from './migration.repository.js';

/** Ejecuta una tarea bajo lock de esquema y libera el lock si la tarea falla. */
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
