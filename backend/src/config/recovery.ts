import 'dotenv/config';
import { z } from 'zod';
/** Sandbox únicamente: las credenciales nunca se exponen al cliente. */
export const recoveryEnv = z
  .object({
    MAILTRAP_API_TOKEN: z.string().min(20).optional(),
    MAILTRAP_INBOX_ID: z.string().regex(/^\d+$/u).optional(),
    PASSWORD_RESET_URL: z.url().startsWith('https://').optional(),
  })
  .parse({
    MAILTRAP_API_TOKEN: process.env.MAILTRAP_API_TOKEN || undefined,
    MAILTRAP_INBOX_ID: process.env.MAILTRAP_INBOX_ID || undefined,
    PASSWORD_RESET_URL: process.env.PASSWORD_RESET_URL || undefined,
  });
/** Indica si se puede capturar un correo de demostración.
 * @returns Verdadero cuando todas las variables privadas están configuradas.
 */
export function recoveryConfigured() {
  return Boolean(
    recoveryEnv.MAILTRAP_API_TOKEN &&
    recoveryEnv.MAILTRAP_INBOX_ID &&
    recoveryEnv.PASSWORD_RESET_URL,
  );
}
