import type { PoolConnection, RowDataPacket } from 'mysql2/promise';

/** Detecta el motor real; nunca interpreta MySQL como si fuera MariaDB.
 * @param connection Conexión que ejecutará las migraciones.
 * @returns Si el servidor se identifica como MariaDB.
 */
export async function isMariaDb(connection: PoolConnection) {
  const [rows] = await connection.query<RowDataPacket[]>('SELECT VERSION() version');
  return String(rows[0]?.version).includes('MariaDB');
}

/** Conserva archivos/checksums históricos y adapta solo la sintaxis de su ejecución.
 * @param sql Sentencia histórica; los nuevos DDL se escriben para ambos motores.
 * @param mariaDb Motor comprobado en la misma conexión.
 * @returns SQL equivalente, con restricciones CHECK igualmente activas.
 */
export function migrationSql(sql: string, mariaDb: boolean) {
  if (!mariaDb) return sql;
  return sql
    .replaceAll('utf8mb4_0900_ai_ci', 'utf8mb4_unicode_ci')
    .replace(/\bDROP CHECK\b/gu, 'DROP CONSTRAINT');
}
