import type { AxiosResponse } from 'axios';
import { markBackendReady } from './backendConnection';
/** Impide interpretar HTML de arranque o proxy como datos de negocio.
 * @param response Respuesta de un transporte de la aplicación.
 * @returns La misma respuesta cuando respeta el contrato JSON.
 * @throws Error ante una respuesta inesperada, sin repetir una posible escritura.
 */
export function validateResponse(response: AxiosResponse) {
  if (response.status !== 204 && (typeof response.data !== 'object' || response.data === null))
    throw new Error('La conexión todavía no está lista. Volvé a intentar en unos instantes.');
  markBackendReady();
  return response;
}
