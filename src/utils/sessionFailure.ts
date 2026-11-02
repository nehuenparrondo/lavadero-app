import axios from 'axios';
/** Solo un rechazo definitivo de credenciales invalida la sesión local.
 * @param error Error de una renovación; caídas de red y 5xx son recuperables.
 * @returns true para respuestas 401/403, false para fallas transitorias.
 */
export function isSessionRejected(error: unknown) {
  return axios.isAxiosError(error) && [401, 403].includes(error.response?.status ?? 0);
}
