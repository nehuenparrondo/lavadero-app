import type { PoolConnection } from 'mysql2/promise';
import { requireDatabase } from './requireDatabase.js';

/** Presta conexión a una tarea y cierra el pool incluso si falla la adquisición. */
export async function runWithDatabase(task: (connection: PoolConnection) => Promise<void>) {
  const pool = requireDatabase();
  try {
    const connection = await pool.getConnection();
    try {
      await task(connection);
    } finally {
      connection.release();
    }
  } finally {
    await pool.end();
  }
}
