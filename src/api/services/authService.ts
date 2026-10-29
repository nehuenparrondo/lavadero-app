import { publicTransport, requireApi } from '../transport';
import type { Session, User } from '../../types/entities';
/** Registro siempre Cliente; rol no forma parte de este contrato. */
export async function register(input: Record<string, string>) {
  requireApi();
  return (await publicTransport.post<{ data: Session }>('/api/v1/auth/register', input)).data
    .data;
}
/** Inicio de sesión email/contraseña. */
export async function login(input: { email: string; password: string }) {
  requireApi();
  return (await publicTransport.post<{ data: Session }>('/api/v1/auth/login', input)).data
    .data;
}
/** Renueva sesión mediante refresh opaco. */
export async function refreshSession(refreshToken: string) {
  requireApi();
  return (
    await publicTransport.post<{ data: Session }>('/api/v1/auth/refresh', { refreshToken })
  ).data.data;
}
/** Revoca la familia del dispositivo en backend. */
export async function logout(refreshToken: string) {
  requireApi();
  await publicTransport.post('/api/v1/auth/logout', { refreshToken });
}
/** Canje OAuth PKCE: el frontend nunca tiene client secrets de proveedores. */
export async function exchangeSocial(code: string, codeVerifier: string) {
  requireApi();
  return (
    await publicTransport.post<{ data: Session }>('/api/v1/auth/oauth/exchange', {
      code,
      codeVerifier,
    })
  ).data.data;
}
/** Estado de habilitación de accesos sociales. */
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
