import axios from 'axios';
import { parseApiUrl } from '../utils/parseApiUrl';
/** El origen siempre viene de entorno y exige HTTPS público. */
export const apiUrl = parseApiUrl(process.env.EXPO_PUBLIC_API_URL);
/** Transporte sin interceptor para evitar recursión al renovar sesiones. */
export const publicTransport = axios.create({
  timeout: 65000,
  ...(apiUrl ? { baseURL: apiUrl } : {}),
});
/** Exige configuración antes de enviar cualquier petición. */
export function requireApi() {
  if (!apiUrl) throw new Error('La conexión con el lavadero todavía no fue configurada.');
}
