import { z } from 'zod';
import { getProvider } from '../../config/oauth.js';
import type { Provider } from './oauth.types.js';
import { fetchJson } from './provider.http.js';
import { providerProfile } from './provider.profile.js';
/** Canjea código solo en backend con client secret y PKCE del proveedor cuando es compatible.
 * @param provider - Proveedor permitido: Google, Discord o GitHub.
 * @param code - Código efímero recibido del flujo de autorización.
 * @param verifier - Secreto PKCE generado por el dispositivo que inició el acceso.
 * @returns `Promise<import("./oauth.types.js").SocialIdentity>`.
 */
export async function exchangeProvider(provider: Provider, code: string, verifier: string) {
  const config = getProvider(provider);
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uri: config.callback,
  });
  if (config.pkce) body.set('code_verifier', verifier);
  const result = await fetchJson(config.token, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  return providerProfile(provider, z.string().min(1).parse(result.access_token));
}
