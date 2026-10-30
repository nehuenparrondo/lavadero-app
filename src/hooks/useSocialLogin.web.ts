import { AuthRequest, makeRedirectUri, ResponseType } from 'expo-auth-session';
import { randomUUID } from 'expo-crypto';
import { apiUrl, requireApi } from '../api/transport';
import { pendingOAuthKey } from '../utils/pendingOAuth';
import { useAction } from './useAction';

/** AuthSession prepara PKCE; web navega en la pestaña para no depender de popups. */
export function useSocialLogin(provider: 'google' | 'discord' | 'github') {
  const action = useAction();
  const start = () =>
    action.run(async () => {
      requireApi();
      const request = new AuthRequest({
        clientId: 'lavadero-web',
        responseType: ResponseType.Code,
        redirectUri: makeRedirectUri({ path: 'oauth' }),
        usePKCE: true,
        state: randomUUID(),
      });
      const url = await request.makeAuthUrlAsync({
        authorizationEndpoint: `${apiUrl}/api/v1/auth/oauth/${provider}/authorize`,
      });
      if (!request.codeVerifier) throw new Error('No se pudo preparar el acceso seguro.');
      sessionStorage.setItem(
        pendingOAuthKey,
        JSON.stringify({
          state: request.state,
          verifier: request.codeVerifier,
          createdAt: Date.now(),
        }),
      );
      window.location.assign(url);
    }, '');
  return { start, ready: Boolean(apiUrl), busy: action.busy, error: action.error };
}
