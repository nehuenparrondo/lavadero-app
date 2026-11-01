import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { refreshSession } from './services/authService';
import { deleteRefresh, storeRefresh } from './sessionStorage';
import { getSession, setSession } from './sessionStore';
import { apiUrl, requireApi } from './transport';
export { apiUrl } from './transport';
let refreshing: Promise<string> | null = null;
/** Cliente autenticado; solo api/services envía solicitudes. */
export const apiClient = axios.create({
  timeout: 65000,
  ...(apiUrl ? { baseURL: apiUrl } : {}),
});
apiClient.interceptors.request.use((config) => {
  requireApi();
  const token = getSession()?.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
/** Una sola renovación compartida entre solicitudes concurrentes. */
async function renew() {
  const current = getSession();
  if (!current) throw new Error('Tu sesión venció.');
  const next = await refreshSession(current.refreshToken);
  if (getSession()?.refreshToken !== current.refreshToken)
    throw new Error('La sesión cambió durante la solicitud.');
  await storeRefresh(next.refreshToken);
  setSession(next);
  return next.accessToken;
}
apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error) || error.response?.status !== 401 || !error.config)
      throw error;
    const config = error.config as InternalAxiosRequestConfig & { retried?: boolean };
    if (config.retried || !getSession()) {
      setSession(null);
      await deleteRefresh();
      throw error;
    }
    config.retried = true;
    try {
      if (!refreshing)
        refreshing = renew().finally(() => {
          refreshing = null;
        });
      config.headers.Authorization = `Bearer ${await refreshing}`;
      return await apiClient(config);
    } catch (refreshError) {
      setSession(null);
      await deleteRefresh();
      throw refreshError;
    }
  },
);
