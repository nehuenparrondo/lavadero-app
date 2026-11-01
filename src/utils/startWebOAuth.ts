import { AuthRequest, makeRedirectUri, ResponseType } from 'expo-auth-session';
import { randomUUID } from 'expo-crypto';
import { apiUrl, requireApi } from '../api/transport';
import { pendingOAuthKey } from './pendingOAuth';

/** Prepara PKCE y navega en la misma pestaña, sin secretos de proveedor ni popups.
 * @param provider - Proveedor permitido: Google, Discord o GitHub.
 * @returns `Promise<void>`, según el contrato de la operación.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function startWebOAuth(provider: 'google' | 'discord' | 'github') {
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
}
