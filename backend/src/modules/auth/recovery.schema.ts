import { z } from 'zod';
import { passwordSchema } from '../../utils/password.js';
/** El retorno lo fija el servidor, jamás se acepta una URL del solicitante. */
export const forgotPasswordSchema = z
  .object({
    email: z
      .email()
      .max(254)
      .transform((value) => value.toLowerCase()),
  })
  .strict();
/** Solo el POST consume el token; abrir el enlace no cambia la cuenta. */
export const resetPasswordSchema = z
  .object({
    token: z.string().regex(/^[a-f0-9]{64}$/u),
    newPassword: passwordSchema,
  })
  .strict();
