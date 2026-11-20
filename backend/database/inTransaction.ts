import type { PoolConnection } from 'mysql2/promise';

/** Confirma DML exitoso o revierte ante fallos. No usar para DDL MySQL.
 * @param connection - Conexión prestada; el llamador sigue siendo responsable de liberarla.
 * @param task - Escrituras DML que comparten esta conexión; no usar DDL con commit implícito.
 * @returns Promesa sin valor después del commit; ante error hace rollback y propaga el fallo.
 */
export async function inTransaction(connection: PoolConnection, task: () => Promise<void>) {
  await connection.beginTransaction();
  try {
    await task();
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}
