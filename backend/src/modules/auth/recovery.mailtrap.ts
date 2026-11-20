import { recoveryEnv, recoveryConfigured } from '../../config/recovery.js';
/** Envía exclusivamente a la bandeja Sandbox por HTTPS; no utiliza puertos SMTP.
 * @param email - Destinatario ficticio o real capturado en Sandbox, sin entrega externa.
 * @param url - Enlace fijo del sitio con token en el fragmento.
 * @returns Promesa resuelta solo si Mailtrap acepta el mensaje.
 */
export async function sendRecoveryMail(email: string, url: string) {
  if (!recoveryConfigured()) throw new Error('RECOVERY_NOT_CONFIGURED');
  const response = await fetch(
    `https://sandbox.api.mailtrap.io/api/send/${recoveryEnv.MAILTRAP_INBOX_ID}`,
    {
      method: 'POST',
      signal: AbortSignal.timeout(10000),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${recoveryEnv.MAILTRAP_API_TOKEN}`,
      },
      body: JSON.stringify({
        from: { email: 'recuperacion@lavadero.example', name: 'Lavadero' },
        to: [{ email }],
        subject: 'Lavadero · Recuperá tu contraseña',
        category: 'Lavadero · recuperación',
        text: `Solicitaste recuperar tu contraseña de Lavadero.\n\nAbrí este enlace: ${url}\n\nVence en 15 minutos y puede usarse una sola vez. Si no lo pediste, ignorá este mensaje.\n\nDemostración: correo capturado por Mailtrap Sandbox, sin entrega a casillas reales.`,
      }),
    },
  );
  if (!response.ok) throw new Error('MAILTRAP_DELIVERY_FAILED');
}
