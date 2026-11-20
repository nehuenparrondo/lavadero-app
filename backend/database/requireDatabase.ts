import { database } from '../src/config/database.js';

/** Obtiene el pool configurado. @throws Error si falta DATABASE_URL.
 * @returns Pool configurado con la conexión y TLS del entorno; falla si DATABASE_URL no está definido.
 */
export function requireDatabase() {
  if (!database) throw new Error('Configurá DATABASE_URL antes de ejecutar la herramienta.');
  return database;
}
