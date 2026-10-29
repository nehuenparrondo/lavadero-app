import axios from 'axios';
import { parseApiUrl } from '../utils/parseApiUrl';

/** Origen público sin valor alternativo localhost. */
export const apiUrl = parseApiUrl(process.env.EXPO_PUBLIC_API_URL);
/** Cliente HTTP. Solo api/services puede enviar solicitudes. JWT se incorpora en etapa 3/6. */
export const apiClient = axios.create({
  timeout: 15000,
  ...(apiUrl ? { baseURL: apiUrl } : {}),
});
