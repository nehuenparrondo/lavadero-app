import { useEffect, useState } from 'react';
import { randomUUID } from 'expo-crypto';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { apiUrl } from '../api/transport';
import { exchangeSocial } from '../api/services/authService';
import { useAuth } from './useAuth';
import { useAction } from './useAction';
WebBrowser.maybeCompleteAuthSession();
/** Inicia AuthSession con PKCE; la API intercambia el código y emite su propia sesión. */
export function useSocialLogin(provider: 'google' | 'discord' | 'github') {
  const auth = useAuth();
  const action = useAction();
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
  useEffect(() => {
    if (response?.type === 'success' && request?.codeVerifier) {
      const code = response.params.code;
      const verifier = request.codeVerifier;
      if (code)
        void action.run(async () => {
          await auth.accept(await exchangeSocial(code, verifier));
        }, '');
    }
  }, [response]);
  const start = async () => {
    setOpening(true);
    await action.run(async () => {
      await prompt();
    }, '');
    setOpening(false);
  };
  return { start, ready: Boolean(request), busy: opening || action.busy, error: action.error };
}
