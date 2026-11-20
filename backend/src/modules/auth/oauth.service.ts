import type { z } from 'zod';
import { authEnv } from '../../config/authEnv.js';
import { getProvider, providerAvailability } from '../../config/oauth.js';
import { AppError } from '../../errors/AppError.js';
import { transaction } from '../../utils/transaction.js';
import { issueGrant } from './oauth.identity.service.js';
import { oauthErrorReturn } from './oauth.return.js';
import * as repo from './oauth.repository.js';
import type { authorizeSchema } from './oauth.schema.js';
import type { Provider } from './oauth.types.js';
import { pkceChallenge } from './pkce.js';
import { exchangeProvider } from './provider.service.js';
import { opaqueToken, tokenHash } from './token.service.js';
export { exchange } from './oauth.exchange.service.js';
export { pkceChallenge } from './pkce.js';
/** Metadatos públicos, solo habilitado/deshabilitado por proveedor.
 * @returns `{ provider: string; enabled: boolean; }[]`.
 */
export function listProviders() {
  return providerAvailability();
}
/** Prepara redirección al proveedor y vincula state/redirect/client PKCE de la app.
 * @param provider - Proveedor permitido: Google, Discord o GitHub.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<string>`.
 */
export async function authorize(provider: Provider, input: z.infer<typeof authorizeSchema>) {
  assertRedirectUri(input.redirect_uri);
  const config = getProvider(provider);
  const state = opaqueToken();
  const verifier = opaqueToken();
  await repo.saveState(tokenHash(state), {
    provider,
    clientState: input.state,
    redirectUri: input.redirect_uri,
    clientChallenge: input.code_challenge,
    providerVerifier: verifier,
  });
  const url = new URL(config.authorize);
  url.search = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.callback,
    response_type: 'code',
    scope: config.scope,
    prompt: config.prompt,
    state,
  }).toString();
  if (config.pkce) {
    url.searchParams.set('code_challenge', pkceChallenge(verifier));
    url.searchParams.set('code_challenge_method', 'S256');
  }
  return url.toString();
}
/** Consume callback del proveedor y entrega solamente código efímero al deep link.
 * @param provider - Proveedor permitido: Google, Discord o GitHub.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<string>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function callback(
  provider: Provider,
  input: { state: string; code?: string | undefined; error?: string | undefined },
) {
  getProvider(provider);
  const state = await transaction((connection) =>
    repo.takeState(tokenHash(input.state), connection),
  );
  if (!state || state.provider !== provider)
    throw new AppError(
      400,
      'INVALID_OAUTH_STATE',
      'La solicitud social venció o ya se utilizó.',
    );
  if (input.error || !input.code) return oauthErrorReturn(state, 'access_denied');
  try {
    return await issueGrant(
      provider,
      await exchangeProvider(provider, input.code, state.providerVerifier),
      state,
    );
  } catch {
    return oauthErrorReturn(state, 'provider_unavailable');
  }
}

/** Solo admite retornos completos declarados por el propietario del backend. */
function assertRedirectUri(redirectUri: string) {
  if (
    !authEnv.OAUTH_REDIRECT_URIS.split(',')
      .map((v) => v.trim())
      .includes(redirectUri)
  )
    throw new AppError(400, 'INVALID_REDIRECT', 'La redirección móvil no está autorizada.');
}
