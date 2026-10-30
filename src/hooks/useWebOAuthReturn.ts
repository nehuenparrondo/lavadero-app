import { useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { exchangeSocial } from '../api/services/authService';
import { pendingOAuthKey, readPendingOAuth } from '../utils/pendingOAuth';
import { useAuth } from './useAuth';
import { useAction } from './useAction';

/** Consume el retorno web una vez, validando state/PKCE antes de guardar sesión. */
export function useWebOAuthReturn() {
  const auth = useAuth();
  const action = useAction();
  const params = useLocalSearchParams<{ code?: string; state?: string; error?: string }>();
  const started = useRef(false);
  useEffect(() => {
    if (auth.restoring || started.current) return;
    started.current = true;
    void action.run(async () => {
      const pending = readPendingOAuth(sessionStorage.getItem(pendingOAuthKey), params.state);
      sessionStorage.removeItem(pendingOAuthKey);
      if (params.error) throw new Error('El ingreso social fue cancelado.');
      if (typeof params.code !== 'string')
        throw new Error('Falta el código de acceso social.');
      await auth.accept(await exchangeSocial(params.code, pending.verifier));
    }, '');
  }, [auth.restoring]);
  return { user: auth.user, error: action.error };
}
