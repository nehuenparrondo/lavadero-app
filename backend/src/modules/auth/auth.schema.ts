import { z } from 'zod';
import { passwordSchema } from '../../utils/password.js';

/** Registro público estricto: rol y habilitación de cobros no son aceptados. */
export const registerSchema = z
  .object({
    email: z
      .email()
      .max(254)
      .transform((value) => value.toLowerCase()),
    password: passwordSchema,
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().max(80),
    phone: z.string().trim().max(30).optional(),
  })
  .strict();
/** Login tradicional. */
export const loginSchema = z
  .object({
    email: z.email().transform((v) => v.toLowerCase()),
    password: z.string().min(1).max(200),
  })
  .strict();
/** Refresh opaco de 32 bytes, no JWT externo. */
export const refreshSchema = z
  .object({ refreshToken: z.string().regex(/^[a-f0-9]{64}$/u) })
  .strict();
