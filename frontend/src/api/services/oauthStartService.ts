import { publicTransport } from '../transport';
const origins = {
  google: 'https://accounts.google.com',
  github: 'https://github.com',
  discord: 'https://discord.com',
};
/** Prepara una autorización PKCE por JSON y verifica el destino antes de salir de la app.
 * @param provider Proveedor soportado, nunca una URL arbitraria.
 * @param authorizationUrl Solicitud generada por AuthSession con state y PKCE.
 * @returns URL HTTPS del proveedor elegido.
 * @throws Error ante un destino o contrato inesperado.
 */
export async function prepareSocialLogin(
  provider: keyof typeof origins,
  authorizationUrl: string,
) {
  const params = Object.fromEntries(new URL(authorizationUrl).searchParams);
  const response = await publicTransport.post<{ data: { url: string } }>(
    `/api/v1/auth/oauth/${provider}/start`,
    params,
  );
  const destination = new URL(response.data.data.url);
  if (destination.origin !== origins[provider] || destination.username || destination.password)
    throw new Error('No se pudo preparar el acceso seguro. Volvé a intentar.');
  return destination.toString();
}
