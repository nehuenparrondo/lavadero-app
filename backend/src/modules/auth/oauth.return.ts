import type { OAuthState } from './oauth.types.js';
/** Retorna errores públicos únicamente al redirect de un estado ya validado y consumido.
 * @param state Estado persistido por authorize, nunca datos directos del callback.
 * @param error Código público; no incluye tokens ni detalles del proveedor.
 * @returns URL allowlisted con el state original del cliente.
 */
export function oauthErrorReturn(
  state: OAuthState,
  error: 'access_denied' | 'provider_unavailable',
) {
  const url = new URL(state.redirectUri);
  url.searchParams.set('error', error);
  url.searchParams.set('state', state.clientState);
  return url.toString();
}
