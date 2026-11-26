import type { Session, User } from '../../types/entities';
import { publicTransport, requireApi } from '../transport';
/** Registro siempre Cliente; rol no forma parte de este contrato.
 * @param input - Nombre, apellido, correo y contraseña del registro; la API asigna siempre el rol Cliente.
 * @returns Sesión de la cuenta nueva: perfil público, access, refresh y vencimiento en segundos.
 */
export async function register(input: Record<string, string>) {
  requireApi();
  return (await publicTransport.post<{ data: Session }>('/api/v1/auth/register', input)).data
    .data;
}
/** Inicio de sesión email/contraseña.
 * @param input - Correo y contraseña que se transmiten exclusivamente al backend configurado.
 * @returns Sesión propia de Lavadero; un rechazo HTTP se propaga al hook de acceso.
 */
export async function login(input: { email: string; password: string }) {
  requireApi();
  return (await publicTransport.post<{ data: Session }>('/api/v1/auth/login', input)).data
    .data;
}
/** Renueva sesión mediante refresh opaco.
 * @param refreshToken - Credencial opaca del dispositivo, revocable por el servidor.
 * @returns Sesión rotada; el llamador persiste el nuevo refresh antes de publicar la sesión.
 */
export async function refreshSession(refreshToken: string) {
  requireApi();
  return (
    await publicTransport.post<{ data: Session }>('/api/v1/auth/refresh', { refreshToken })
  ).data.data;
}
/** Revoca la familia del dispositivo en backend.
 * @param refreshToken - Credencial opaca del dispositivo, revocable por el servidor.
 * @returns Promesa sin valor tras revocar la familia; la limpieza local corresponde a sessionActions.
 */
export async function logout(refreshToken: string) {
  requireApi();
  await publicTransport.post('/api/v1/auth/logout', { refreshToken });
}
/** Canje OAuth PKCE: el frontend nunca tiene client secrets de proveedores.
 * @param code - Código efímero recibido del flujo de autorización.
 * @param codeVerifier - Secreto PKCE original de la app que inició el acceso.
 * @param password - Contraseña de la cuenta, usada solo para comprobar su propiedad.
 * @returns Sesión de Lavadero tras consumir el grant con PKCE; la vinculación puede requerir la contraseña local.
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
 * @returns Disponibilidad pública de Google, Discord y GitHub, según su configuración privada en el servidor.
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
export type PublicProfile = Pick<User, 'firstName' | 'lastName' | 'phone'>;
