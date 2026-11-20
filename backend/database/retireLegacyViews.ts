import type { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { runWithDatabase } from './runWithDatabase.js';
import { withMigrationLock } from './withMigrationLock.js';

/** Solo alias de la transición; nunca elimina tablas ni filas de negocio. */
const legacy = [
  'users',
  'social_accounts',
  'refresh_tokens',
  'vehicle_types',
  'vehicles',
  'services',
  'service_prices',
  'appointment_statuses',
  'appointments',
  'appointment_services',
  'appointment_notes',
  'appointment_status_history',
  'payments',
  'business_settings',
  'business_hours',
  'booking_day_locks',
  'oauth_states',
  'oauth_grants',
  'appointment_vehicle_details',
  'wash_submissions',
  'customer_messages',
  'employee_attendance',
  'schema_migrations',
];

/** Ejecutar después de retirar todos los procesos que todavía usaban nombres antiguos. */
async function retire(connection: PoolConnection) {
  const [migrations] = await connection.query<RowDataPacket[]>(
    'SELECT name FROM migraciones_esquema WHERE name IN (?,?)',
    ['013_spanish_tables.sql', '014_spanish_booking_locks.sql'],
  );
  if (migrations.length !== 2)
    throw new Error('Primero deben terminar las migraciones españolas.');
  const [views] = await connection.query<RowDataPacket[]>(
    "SELECT TABLE_NAME name FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_TYPE='VIEW' AND TABLE_NAME IN (?)",
    [legacy],
  );
  for (const row of views) {
    const name = String(row.name);
    if (!legacy.includes(name)) throw new Error('Alias no permitido.');
    await connection.query(`DROP VIEW \`${name}\``);
  }
  console.info(`Alias retirados: ${views.length}. Tablas y filas conservadas.`);
}

void runWithDatabase((connection) =>
  withMigrationLock(connection, () => retire(connection)),
).catch(() => {
  console.error('No se retiraron los alias. Revisá versiones y permisos.');
  process.exitCode = 1;
});
