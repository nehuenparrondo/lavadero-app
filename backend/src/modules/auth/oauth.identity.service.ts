import { AppError } from '../../errors/AppError.js';
import type { Executor } from '../../utils/db.js';
import { transaction } from '../../utils/transaction.js';
import { findByEmail, findUser, insertUser } from '../users/users.repository.js';
import { saveGrant } from './oauth.grants.repository.js';
import { findSocial, linkSocial } from './oauth.repository.js';
import type { OAuthState, Provider, SocialIdentity } from './oauth.types.js';
import { opaqueToken, tokenHash } from './token.service.js';
/** Busca la cuenta del proveedor/email o crea exclusivamente un Cliente social. */
async function resolveIdentity(
  provider: Provider,
  profile: SocialIdentity,
  connection: Executor,
) {
  const social = await findSocial(provider, profile.subject, connection);
  let identity = social
    ? await findUser(String(social.userId), connection)
    : await findByEmail(profile.email, connection);
  if (!identity) {
    const id = await insertUser(
      {
        ...profile,
        firstName: profile.firstName.slice(0, 80),
        lastName: profile.lastName.slice(0, 80),
      },
      null,
      'client',
      connection,
    );
    identity = await findUser(id, connection);
  }
  if (!identity || !identity.isActive || identity.deletedAt)
    throw new AppError(403, 'ACCOUNT_DISABLED', 'Esta cuenta no está activa.');
  const pending =
    !social && identity.passwordHash ? { provider, subject: profile.subject } : undefined;
  if (!social && !pending)
    await linkSocial(identity.id, provider, profile.subject, connection);
  return { identity, pending };
}
/** Emite un código de un uso; una cuenta local requiere probar su contraseña antes de vincular.
 * @param provider - Proveedor permitido: Google, Discord o GitHub.
 * @param profile - Identidad verificada obtenida directamente del proveedor social.
 * @param state - Estado del flujo con sus datos y vencimiento.
 * @returns `Promise<string>`.
 */
export function issueGrant(provider: Provider, profile: SocialIdentity, state: OAuthState) {
  return transaction(async (connection) => {
    const { identity, pending } = await resolveIdentity(provider, profile, connection);
    const code = opaqueToken();
    await saveGrant(tokenHash(code), identity.id, state.clientChallenge, connection, pending);
    const url = new URL(state.redirectUri);
    url.searchParams.set('code', code);
    url.searchParams.set('state', state.clientState);
    return url.toString();
  });
}
