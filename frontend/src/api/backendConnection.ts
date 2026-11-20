import axios from 'axios';
import { apiUrl, requireApi } from './config';
import { setConnecting } from './connectionState';
import { createReadinessGate } from './readinessGate';
// Transporte aislado: sondear /ready no puede entrar en los interceptores de negocio.
const probe = axios.create({
  baseURL: apiUrl ?? '',
  timeout: 12000,
  validateStatus: () => true,
});
const gate = createReadinessGate({
  probe: async () => {
    requireApi();
    const response = await probe.get<{ status?: string }>('/ready');
    return response.status === 200 && response.data?.status === 'ready';
  },
  now: Date.now,
  pause: () => new Promise((resolve) => setTimeout(resolve, 1000)),
  notify: setConnecting,
});
/** Espera al servidor antes de enviar credenciales o una operación de escritura.
 * @returns Promesa compartida; rechaza si se agota el plazo de conexión.
 */
export function ensureBackendReady() {
  requireApi();
  return gate.ensure();
}
/** Renueva la ventana de disponibilidad con una respuesta JSON válida.
 * @returns void.
 */
export function markBackendReady() {
  gate.markReady();
}
