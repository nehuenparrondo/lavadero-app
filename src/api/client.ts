import axios from 'axios';
import { ensureBackendReady } from './backendConnection';
import { apiUrl } from './config';
import { renewRequest } from './renewRequest';
import type { AuthRequestConfig } from './renewRequest';
import { getSession } from './sessionStore';
import { validateResponse } from './validateResponse';
export { apiUrl } from './config';
/** Transporte autenticado; espera disponibilidad antes de enviar una escritura. */
export const apiClient = axios.create({
  timeout: 65000,
  ...(apiUrl ? { baseURL: apiUrl } : {}),
});
apiClient.interceptors.request.use(async (config: AuthRequestConfig) => {
  await ensureBackendReady();
  const session = getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
    config.actorId ??= session.user.id;
  }
  return config;
});
apiClient.interceptors.response.use(validateResponse, (error: unknown) =>
  renewRequest(error, (config) => apiClient(config)),
);
