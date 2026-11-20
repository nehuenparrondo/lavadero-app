import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { pendingOAuthKey, readPendingOAuth } from '../utils/pendingOAuth';
import { useAuth } from './useAuth';
import { useSocialExchange } from './useSocialExchange';

/** Consume el retorno web una vez, validando state/PKCE antes de guardar sesión.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function useWebOAuthReturn() {
  const auth = useAuth();
  const action = useSocialExchange();
  const params = useLocalSearchParams<{ code?: string; state?: string; error?: string }>();
  const started = useRef(false);
  useEffect(() => {
    if (auth.restoring || started.current) return;
    started.current = true;
    void action.run(async () => {
      const pending = readPendingOAuth(sessionStorage.getItem(pendingOAuthKey), params.state);
      sessionStorage.removeItem(pendingOAuthKey);
      if (params.error)
        throw new Error(
          params.error === 'access_denied'
            ? 'El ingreso social fue cancelado.'
            : 'No pudimos completar el ingreso con ese proveedor. Volvé a intentar.',
        );
      if (typeof params.code !== 'string')
        throw new Error('Falta el código de acceso social.');
      await action.complete(params.code, pending.verifier);
    }, '');
  }, [auth.restoring]);
  return { user: auth.user, ...action };
}
