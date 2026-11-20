import type { HealthResponse } from '../../types/health';
import { apiClient, apiUrl } from '../client';

/** Comprueba conectividad. @throws Error ante configuración ausente, red o respuesta inválida.
 * @param signal - Señal de cancelación transmitida al transporte HTTP.
 * @returns `Promise<HealthResponse>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function getApiHealth(signal?: AbortSignal): Promise<HealthResponse> {
  if (!apiUrl) throw new Error('Configurá EXPO_PUBLIC_API_URL con el origen HTTPS de Render.');
  const { data } = await apiClient.get<HealthResponse>('/health', signal ? { signal } : {});
  if (data.status !== 'ok' || data.service !== 'lavadero-api')
    throw new Error('API inesperada.');
  return data;
}
