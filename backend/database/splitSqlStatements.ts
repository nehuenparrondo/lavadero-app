/** Separa bloques delimitados con statement-breakpoint.
 * @param sql Archivo de migración o semilla.
 * @returns Sentencias no vacías, sin romper puntos y coma dentro de cadenas.
 */
export function splitSqlStatements(sql: string): string[] {
  return sql
    .split(/^-- statement-breakpoint\s*$/mu)
    .map((part) => part.trim())
    .filter(Boolean);
}
