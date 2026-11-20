import type { PoolOptions } from 'mysql2/promise';
import { createPool } from 'mysql2/promise';
import { env } from './env.js';

/** Crea un pool con CA verificada y valores temporales en UTC. */
function databaseOptions(): PoolOptions {
  const ssl =
    env.DATABASE_TLS === 'true'
      ? {
          ...(env.DATABASE_CA_BASE64
            ? { ca: Buffer.from(env.DATABASE_CA_BASE64, 'base64').toString('utf8') }
            : {}),
          rejectUnauthorized: true,
          verifyIdentity: true,
        }
      : undefined;
  return {
    uri: env.DATABASE_URL ?? '',
    connectionLimit: env.DATABASE_POOL_SIZE,
    timezone: 'Z',
    dateStrings: true,
    supportBigNumbers: true,
    bigNumberStrings: true,
    decimalNumbers: false,
    multipleStatements: false,
    connectTimeout: 10000,
    ...(ssl ? { ssl } : {}),
  };
}

/** Pool privado de infraestructura; los módulos acceden mediante repositories. */
export const database = env.DATABASE_URL ? createPool(databaseOptions()) : undefined;

// timezone: 'Z' solo configura el driver; CURRENT_TIMESTAMP también requiere sesión UTC.
database?.on('connection', (connection) => {
  connection.query("SET time_zone = '+00:00'");
});
