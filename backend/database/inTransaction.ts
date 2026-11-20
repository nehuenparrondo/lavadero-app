import type { PoolConnection } from 'mysql2/promise';

/** Confirma DML exitoso o revierte ante fallos. No usar para DDL MySQL. */
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
