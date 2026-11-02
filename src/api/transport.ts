import axios from 'axios';
import { ensureBackendReady } from './backendConnection';
import { apiUrl } from './config';
import { validateResponse } from './validateResponse';
export { apiUrl, requireApi } from './config';
/** Transporte público; la preparación de conexión nunca reenvía una mutación. */
export const publicTransport = axios.create({
  timeout: 65000,
  ...(apiUrl ? { baseURL: apiUrl } : {}),
});
publicTransport.interceptors.request.use(async (config) => {
  await ensureBackendReady();
  return config;
});
publicTransport.interceptors.response.use(validateResponse);
