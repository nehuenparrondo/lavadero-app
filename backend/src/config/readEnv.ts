import { envSchema } from './envSchema.js';

/** Lee variables sin efectos secundarios. @throws Error si falta configuración válida.
 * @param source - Entrada original que se transforma sin modificarla.
 * @returns Objeto con NODE_ENV, PORT, DATABASE_TLS, DATABASE_POOL_SIZE, CORS_ORIGINS, DATABASE_URL, DATABASE_CA_BASE64, JWT_ACCESS_SECRET.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function readEnv(source: NodeJS.ProcessEnv) {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((issue) => issue.path.join('.') || 'entorno');
    throw new Error(`Configuración inválida: ${fields.join(', ')}. Revisá .env.example.`);
  }
  return parsed.data;
}
