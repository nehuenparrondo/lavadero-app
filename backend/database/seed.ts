import { readFile } from 'node:fs/promises';
import type { PoolConnection } from 'mysql2/promise';
import { runWithDatabase } from './runWithDatabase.js';
import { withMigrationLock } from './withMigrationLock.js';
import { inTransaction } from './inTransaction.js';
import { splitSqlStatements } from './splitSqlStatements.js';
import { readSeedConfig } from './seeds/seedConfig.js';
import { seedAdmin } from './seeds/seedAdmin.repository.js';
import { seedSettings } from './seeds/seedSettings.repository.js';

/** Inserta catálogos, configuración y administrador sin sobrescribir registros existentes. */
async function seedData(
  connection: PoolConnection,
  config: ReturnType<typeof readSeedConfig>,
) {
  const sql = await readFile('database/seeds/catalog.sql', 'utf8');
  for (const statement of splitSqlStatements(sql)) await connection.query(statement);
  await seedSettings(connection, config);
  await seedAdmin(connection, config.SEED_ADMIN_EMAIL, config.SEED_ADMIN_PASSWORD);
}

/** Valida entrada y ejecuta DML con transacción y lock compartido con las migraciones. */
async function seed(): Promise<void> {
  const config = readSeedConfig();
  await runWithDatabase((connection) =>
    withMigrationLock(connection, () =>
      inTransaction(connection, () => seedData(connection, config)),
    ),
  );
  console.info('Semillas aplicadas sin exponer credenciales.');
}

void seed().catch(() => {
  console.error(
    'Falló el seed. Revisá variables SEED_ADMIN y BUSINESS y ejecutá migraciones primero.',
  );
  process.exitCode = 1;
});
