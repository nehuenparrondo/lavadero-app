import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { PoolConnection } from 'mysql2/promise';
import { applyMigration, ensureMigrationTable } from './migration.repository.js';
import { runWithDatabase } from './runWithDatabase.js';
import { withMigrationLock } from './withMigrationLock.js';

/** Aplica archivos ordenados. DDL MySQL hace commit implícito y no permite rollback general. */
async function migrate(connection: PoolConnection): Promise<void> {
  await ensureMigrationTable(connection);
  const folder = join(process.cwd(), 'database/migrations');
  const names = (await readdir(folder)).filter((name) => name.endsWith('.sql')).sort();
  for (const name of names) {
    await applyMigration(connection, name, await readFile(join(folder, name), 'utf8'));
  }
}

void runWithDatabase((connection) =>
  withMigrationLock(connection, () => migrate(connection)),
).catch((error: unknown) => {
  const code =
    error && typeof error === 'object' && 'code' in error
      ? String(error.code)
      : 'MIGRATION_ERROR';
  console.error(
    `Falló la migración (${code}). Revisá conectividad, CA, permisos y checksums.`,
  );
  process.exitCode = 1;
});
