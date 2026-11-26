import { apiUrl } from '../api/transport';
import { startWebOAuth } from '../utils/startWebOAuth';
import { useAction } from './useAction';
/** Estado del botón web; la confirmación de vinculación ocurre en la ruta de retorno.
 * @param provider - Google, Discord o GitHub; la API comprueba configuración y estado de un solo uso.
 * @returns Estado y acción que inicia el ingreso en esta pestaña; la ruta OAuth consume el retorno.
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
