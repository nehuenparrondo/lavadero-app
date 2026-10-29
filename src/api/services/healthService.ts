import { apiClient, apiUrl } from '../client';
import type { HealthResponse } from '../../types/health';

/** Comprueba conectividad. @throws Error ante configuración ausente, red o respuesta inválida. */
export async function getApiHealth(signal?: AbortSignal): Promise<HealthResponse> {
  if (!apiUrl) throw new Error('Configurá EXPO_PUBLIC_API_URL con el origen HTTPS de Render.');
  const { data } = await apiClient.get<HealthResponse>('/health', signal ? { signal } : {});
  if (data.status !== 'ok' || data.service !== 'lavadero-api')
    throw new Error('API inesperada.');
  return data;
}
