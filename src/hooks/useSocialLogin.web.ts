import { apiUrl } from '../api/transport';
import { startWebOAuth } from '../utils/startWebOAuth';
import { useAction } from './useAction';
/** Estado del botón web; la confirmación de vinculación ocurre en la ruta de retorno.
 * @param provider - Proveedor permitido: Google, Discord o GitHub.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useSocialLogin(provider: 'google' | 'discord' | 'github') {
  const action = useAction();
  return {
    start: () => action.run(() => startWebOAuth(provider), ''),
    ready: Boolean(apiUrl),
    busy: action.busy,
    error: action.error,
    linkRequired: false,
    cancelLink: () => {},
    confirm: async () => {},
  };
}
