import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { randomUUID } from 'expo-crypto';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { ensureBackendReady } from '../api/backendConnection';
import { apiUrl } from '../api/transport';
import { useSocialExchange } from './useSocialExchange';
import { useSocialResponse } from './useSocialResponse';
WebBrowser.maybeCompleteAuthSession();
/** Inicia AuthSession con PKCE; la API intercambia el código y emite su propia sesión.
 * @param provider - Google, Discord o GitHub; la API comprueba configuración y estado de un solo uso.
 * @returns Acción de ingreso nativo y confirmación de vinculación local, con estado de red y error.
 */
export function useSocialLogin(provider: 'google' | 'discord' | 'github') {
  const action = useSocialExchange();
  const [opening, setOpening] = useState(false);
  const [oauthState] = useState(() => randomUUID());
  const [request, response, prompt] = useAuthRequest(
    {
      clientId: 'lavadero-mobile',
      responseType: ResponseType.Code,
      redirectUri: makeRedirectUri({ scheme: 'lavadero', path: 'oauth' }),
      usePKCE: true,
      state: oauthState,
    },
    { authorizationEndpoint: `${apiUrl}/api/v1/auth/oauth/${provider}/authorize` },
  );
  useSocialResponse(request, response, action);
  const start = async () => {
    setOpening(true);
    await action.run(async () => {
      await ensureBackendReady();
      await prompt();
    }, '');
    setOpening(false);
  };
  return { ...action, start, ready: Boolean(request), busy: opening || action.busy };
}
