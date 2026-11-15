import { publicTransport, requireApi } from '../transport';
/** Estado público del canal, sin credenciales ni identidad de destinatarios. */
export interface RecoveryStatus {
  enabled: boolean;
  delivery: 'sandbox';
}
/** Consulta si está conectado el correo de pruebas.
 * @returns Disponibilidad pública del canal.
 */
export async function getRecoveryStatus() {
  requireApi();
  return (
    await publicTransport.get<{ data: RecoveryStatus }>('/api/v1/auth/password-recovery')
  ).data.data;
}
/** Solicita un enlace con la misma respuesta para cualquier correo.
 * @param email - Correo escrito por la persona.
 * @returns Promesa de solicitud aceptada, sin confirmar si existe la cuenta.
 */
export async function requestPasswordRecovery(email: string) {
  requireApi();
  await publicTransport.post('/api/v1/auth/forgot-password', { email });
}
/** Consume el enlace de un solo uso, sin iniciar sesión automáticamente.
 * @param token - Token del fragmento, mantenido solo en memoria.
 * @param newPassword - Nueva contraseña; viaja únicamente por HTTPS.
 * @returns Promesa de restablecimiento confirmado por el servidor.
 */
export async function resetPassword(token: string, newPassword: string) {
  requireApi();
  await publicTransport.post('/api/v1/auth/reset-password', { token, newPassword });
}
