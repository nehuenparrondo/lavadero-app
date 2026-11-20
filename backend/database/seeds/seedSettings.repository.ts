import type { PoolConnection } from 'mysql2/promise';
import type { readSeedConfig } from './seedConfig.js';

/** Inserta configuración inicial sin sobrescribir cambios posteriores del administrador. */
export async function seedSettings(
  connection: PoolConnection,
  config: ReturnType<typeof readSeedConfig>,
) {
  await connection.execute(
    `INSERT INTO configuracion_negocio
     (id, currency_code, time_zone, cancellation_notice_minutes, simultaneous_capacity)
     VALUES (1, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id = configuracion_negocio.id`,
    [
      config.BUSINESS_CURRENCY,
      config.BUSINESS_TIME_ZONE,
      config.BUSINESS_CANCELLATION_MINUTES,
      config.BUSINESS_CAPACITY,
    ],
  );
  const days = [...new Set(config.BUSINESS_OPEN_DAYS.split(',').map(Number))];
  for (const day of days)
    await connection.execute(
      `INSERT INTO horarios_atencion (weekday, opens_at, closes_at) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE weekday = horarios_atencion.weekday`,
      [day, config.BUSINESS_OPEN_TIME, config.BUSINESS_CLOSE_TIME],
    );
}
