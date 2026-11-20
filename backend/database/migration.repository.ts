import type { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { createHash } from 'node:crypto';
import { splitSqlStatements } from './splitSqlStatements.js';
import { isMariaDb, migrationSql } from './sqlDialect.js';
import {
  canonicalSql,
  migrationChecksum,
  matchesMigrationChecksum,
} from './migrationChecksum.js';

/** Serializa migraciones por base para evitar dos arranques modificando el esquema a la vez. */
export async function lockMigrations(connection: PoolConnection): Promise<string> {
  const [rows] = await connection.query<RowDataPacket[]>('SELECT DATABASE() AS name');
  const key = createHash('sha256').update(String(rows[0]?.name)).digest('hex').slice(0, 32);
  const [result] = await connection.execute<RowDataPacket[]>(
    'SELECT GET_LOCK(?, 60) AS acquired',
    [key],
  );
  if (Number(result[0]?.acquired) !== 1)
    throw new Error('No se pudo obtener lock de migración.');
  return key;
}

/** Crea el registro de migraciones, independiente de las tablas de negocio. */
export async function ensureMigrationTable(connection: PoolConnection): Promise<void> {
  const [legacy] = await connection.query<RowDataPacket[]>(
    "SELECT TABLE_TYPE type FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='schema_migrations'",
  );
  if (legacy[0]?.type === 'BASE TABLE')
    await connection.query('RENAME TABLE schema_migrations TO migraciones_esquema');
  await connection.query(`CREATE TABLE IF NOT EXISTS migraciones_esquema (
    name VARCHAR(150) PRIMARY KEY, checksum CHAR(64) NOT NULL,
    applied_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
  ) ENGINE=InnoDB`);
  if (legacy[0]?.type === 'BASE TABLE')
    await connection.query(
      'CREATE OR REPLACE VIEW schema_migrations AS SELECT * FROM migraciones_esquema',
    );
}

/** Ejecuta una migración nueva o comprueba que su contenido no cambió tras aplicarla. */
export async function applyMigration(connection: PoolConnection, name: string, sql: string) {
  const checksum = migrationChecksum(sql);
  const [existing] = await connection.execute<RowDataPacket[]>(
    'SELECT checksum FROM migraciones_esquema WHERE name = ?',
    [name],
  );
  if (existing[0]) {
    if (!matchesMigrationChecksum(sql, String(existing[0].checksum)))
      throw new Error(`Migración modificada: ${name}`);
    return;
  }
  // El separador explícito evita interpretar puntos y coma dentro de datos o comentarios.
  const mariaDb = await isMariaDb(connection);
  for (const statement of splitSqlStatements(canonicalSql(sql))) {
    await connection.query(migrationSql(statement, mariaDb));
  }
  await connection.execute('INSERT INTO migraciones_esquema (name, checksum) VALUES (?, ?)', [
    name,
    checksum,
  ]);
  console.info(`Migración aplicada: ${name}`);
}
