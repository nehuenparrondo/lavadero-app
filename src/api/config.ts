import { parseApiUrl } from '../utils/parseApiUrl';
/** Origen público validado; no contiene credenciales. */
export const apiUrl = parseApiUrl(process.env.EXPO_PUBLIC_API_URL);
/** Verifica configuración antes de conectar.
 * @returns void.
 * @throws Error si falta el origen HTTPS de la API.
 */
export function requireApi() {
  if (!apiUrl) throw new Error('La conexión con el lavadero todavía no fue configurada.');
}
