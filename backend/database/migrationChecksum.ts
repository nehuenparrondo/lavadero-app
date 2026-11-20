import { createHash } from 'node:crypto';

/** Usa LF para que el SQL nuevo se ejecute y registre igual en Windows y Linux.
 * @param sql - Contenido del archivo de migración versionado.
 * @returns SQL con saltos LF; no cambia ningún otro carácter.
 */
export function canonicalSql(sql: string): string {
  return sql.replaceAll('\r\n', '\n');
}

/** Calcula la identidad canónica de una migración nueva.
 * @param sql - Contenido del archivo de migración versionado.
 * @returns SHA-256 hexadecimal del SQL con saltos LF.
 */
export function migrationChecksum(sql: string): string {
  return createHash('sha256').update(canonicalSql(sql)).digest('hex');
}

/** Conserva compatibilidad con registros históricos calculados con CRLF, sin aceptar ediciones.
 * @param sql - SQL actual, que debe conservar exactamente el contenido histórico.
 * @param expected - Checksum almacenado al aplicar la migración.
 * @returns Verdadero solo si coincide la representación LF o la histórica CRLF del mismo SQL.
 */
export function matchesMigrationChecksum(sql: string, expected: string): boolean {
  const legacy = canonicalSql(sql).replaceAll('\n', '\r\n');
  return (
    expected === migrationChecksum(sql) ||
    expected === createHash('sha256').update(legacy).digest('hex')
  );
}
