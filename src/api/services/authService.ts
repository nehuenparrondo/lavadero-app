import type { Session, User } from '../../types/entities';
import { publicTransport, requireApi } from '../transport';
/** Registro siempre Cliente; rol no forma parte de este contrato.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<Session>`, según el contrato de la operación.
 */
export async function register(input: Record<string, string>) {
  requireApi();
  return (await publicTransport.post<{ data: Session }>('/api/v1/auth/register', input)).data
    .data;
}
/** Inicio de sesión email/contraseña.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<Session>`, según el contrato de la operación.
 */
export async function login(input: { email: string; password: string }) {
  requireApi();
  return (await publicTransport.post<{ data: Session }>('/api/v1/auth/login', input)).data
    .data;
}
/** Renueva sesión mediante refresh opaco.
 * @param refreshToken - Credencial opaca del dispositivo, revocable por el servidor.
 * @returns `Promise<Session>`, según el contrato de la operación.
 */
export async function refreshSession(refreshToken: string) {
  requireApi();
  return (
    await publicTransport.post<{ data: Session }>('/api/v1/auth/refresh', { refreshToken })
  ).data.data;
}
/** Revoca la familia del dispositivo en backend.
 * @param refreshToken - Credencial opaca del dispositivo, revocable por el servidor.
 * @returns `Promise<void>`, según el contrato de la operación.
 */
export async function logout(refreshToken: string) {
  requireApi();
  await publicTransport.post('/api/v1/auth/logout', { refreshToken });
}
/** Canje OAuth PKCE: el frontend nunca tiene client secrets de proveedores.
 * @param code - Código efímero recibido del flujo de autorización.
 * @param codeVerifier - Valor tipado de codeVerifier utilizado por esta operación.
 * @param password - Contraseña de la cuenta, usada solo para comprobar su propiedad.
 * @returns `Promise<Session>`, según el contrato de la operación.
 */
export async function exchangeSocial(code: string, codeVerifier: string, password?: string) {
  requireApi();
  return (
    await publicTransport.post<{ data: Session }>('/api/v1/auth/oauth/exchange', {
      code,
      codeVerifier,
      ...(password ? { password } : {}),
    })
  ).data.data;
}
/** Estado de habilitación de accesos sociales.
 * @returns `Promise<{ provider: string; enabled: boolean; }[]>`, según el contrato de la operación.
 */
export async function getProviders() {
  requireApi();
  return (
    await publicTransport.get<{ data: { provider: string; enabled: boolean }[] }>(
      '/api/v1/auth/providers',
    )
  ).data.data;
}
/** Tipo exportado para formularios de perfil. */
export type PublicProfile = Pick<User, 'firstName' | 'lastName' | 'phone' | 'avatarUrl'>;
