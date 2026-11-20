import { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import type { Provider, SocialIdentity } from './oauth.types.js';
import { fetchJson } from './provider.http.js';
const verifiedEmail = z.email();
/** Lee únicamente atributos de identidad directamente desde Google. */
async function googleProfile(headers: Record<string, string>): Promise<SocialIdentity> {
  const p = await fetchJson('https://openidconnect.googleapis.com/v1/userinfo', { headers });
  if (p.email_verified !== true)
    throw new AppError(409, 'EMAIL_UNVERIFIED', 'El proveedor debe verificar tu email.');
  return {
    subject: z.string().parse(p.sub),
    email: verifiedEmail.parse(p.email),
    firstName: String(p.given_name ?? p.name ?? 'Cliente'),
    lastName: String(p.family_name ?? ''),
  };
}
/** Exige correo verificado de Discord sin solicitar permisos de servidor. */
async function discordProfile(headers: Record<string, string>): Promise<SocialIdentity> {
  const p = await fetchJson('https://discord.com/api/v10/users/@me', { headers });
  if (p.verified !== true)
    throw new AppError(
      409,
      'EMAIL_UNVERIFIED',
      'Verificá tu email en Discord antes de continuar.',
    );
  return {
    subject: z.string().parse(p.id),
    email: verifiedEmail.parse(p.email),
    firstName: String(p.global_name ?? p.username ?? 'Cliente'),
    lastName: '',
  };
}
/** GitHub puede ocultar el correo del perfil; se consulta su lista de correos verificados. */
async function githubProfile(headers: Record<string, string>): Promise<SocialIdentity> {
  const p = await fetchJson('https://api.github.com/user', { headers });
  const response = await fetch('https://api.github.com/user/emails', {
    headers,
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok)
    throw new AppError(401, 'OAUTH_EMAIL_ERROR', 'GitHub no permitió consultar tu email.');
  const emails = z
    .array(z.object({ email: verifiedEmail, primary: z.boolean(), verified: z.boolean() }))
    .parse(await response.json());
  const email =
    emails.find((v) => v.primary && v.verified)?.email ??
    emails.find((v) => v.verified)?.email;
  if (!email)
    throw new AppError(409, 'EMAIL_UNVERIFIED', 'Agregá un email verificado en GitHub.');
  return {
    subject: String(p.id),
    email,
    firstName: String(p.name ?? p.login ?? 'Cliente'),
    lastName: '',
  };
}
/** Selecciona un endpoint cerrado; el cliente no puede introducir URLs de proveedor.
 * @param provider - Proveedor permitido: Google, Discord o GitHub.
 * @param token - Token recibido; se valida o transforma antes de utilizarlo.
 * @returns `Promise<SocialIdentity>`.
 */
export function providerProfile(provider: Provider, token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'User-Agent': 'Lavadero-App',
  };
  return { google: googleProfile, discord: discordProfile, github: githubProfile }[provider](
    headers,
  );
}
