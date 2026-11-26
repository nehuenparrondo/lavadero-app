import { AppError } from '../errors/AppError.js';
import type { Provider } from '../modules/auth/oauth.types.js';
import { authEnv } from './authEnv.js';
/** Metadatos de autorización y credenciales privadas de los tres proveedores. */
const providers = {
  google: {
    authorize: 'https://accounts.google.com/o/oauth2/v2/auth',
    token: 'https://oauth2.googleapis.com/token',
    scope: 'openid email profile',
    prompt: 'select_account',
    pkce: true,
  },
  github: {
    authorize: 'https://github.com/login/oauth/authorize',
    token: 'https://github.com/login/oauth/access_token',
    scope: 'read:user user:email',
    prompt: 'select_account',
    pkce: true,
  },
  discord: {
    authorize: 'https://discord.com/oauth2/authorize',
    token: 'https://discord.com/api/oauth2/token',
    scope: 'identify email',
    prompt: 'consent',
    pkce: true,
  },
} as const;
/** Lee la pareja privada del entorno validado sin incluirla en los metadatos públicos.
 * @param provider Identificador permitido del proveedor social.
 * @returns Client ID y secreto privados; undefined cuando falta configuración.
 */
function credentials(provider: Provider) {
  const prefix = { google: 'GOOGLE', github: 'GITHUB', discord: 'DISCORD' } as const;
  return {
    clientId: authEnv[`${prefix[provider]}_CLIENT_ID`],
    clientSecret: authEnv[`${prefix[provider]}_CLIENT_SECRET`],
  };
}
/** Indica qué botones pueden iniciar OAuth sin revelar secretos.
 * @returns `{ provider: string; enabled: boolean; }[]`.
 */
export function providerAvailability() {
  return (Object.keys(providers) as Provider[]).map((provider) => {
    const value = credentials(provider);
    return {
      provider,
      enabled: Boolean(value.clientId && value.clientSecret && authEnv.PUBLIC_API_URL),
    };
  });
}
/** Configuración de proveedor. @throws AppError 503 si no fue habilitado.
 * @param provider - Proveedor permitido: Google, Discord o GitHub.
 * @returns Credenciales, endpoints, alcance, opción de selección o consentimiento y soporte PKCE.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function getProvider(provider: Provider) {
  const value = { ...providers[provider], ...credentials(provider) };
  if (!value.clientId || !value.clientSecret || !authEnv.PUBLIC_API_URL)
    throw new AppError(
      503,
      'OAUTH_NOT_CONFIGURED',
      'Este acceso social todavía no está habilitado.',
    );
  return {
    ...value,
    clientId: value.clientId,
    clientSecret: value.clientSecret,
    callback: `${authEnv.PUBLIC_API_URL.replace(/\/$/u, '')}/api/v1/auth/oauth/${provider}/callback`,
  };
}
