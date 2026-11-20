import { z } from 'zod';

/** Esquema de datos iniciales; valida límites de bcrypt y valores de agenda. */
export const seedSchema = z
  .object({
    SEED_ADMIN_EMAIL: z.email().transform((value) => value.toLowerCase()),
    SEED_ADMIN_PASSWORD: z.string().refine((value) => {
      const bytes = Buffer.byteLength(value, 'utf8');
      return bytes >= 12 && bytes <= 72;
    }),
    BUSINESS_CURRENCY: z.literal('ARS').default('ARS'),
    BUSINESS_TIME_ZONE: z
      .string()
      .default('America/Argentina/Buenos_Aires')
      .refine((value) => {
        try {
          new Intl.DateTimeFormat('es', { timeZone: value });
          return true;
        } catch {
          return false;
        }
      }),
    BUSINESS_OPEN_TIME: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/u)
      .default('09:30'),
    BUSINESS_CLOSE_TIME: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/u)
      .default('16:30'),
    BUSINESS_OPEN_DAYS: z
      .string()
      .regex(/^[1-7](,[1-7])*$/u)
      .default('1,2,3,4,5,6'),
    BUSINESS_CAPACITY: z.coerce.number().int().min(1).max(100).default(1),
    BUSINESS_CANCELLATION_MINUTES: z.coerce.number().int().min(0).max(65535).default(120),
  })
  .refine((value) => value.BUSINESS_CLOSE_TIME > value.BUSINESS_OPEN_TIME);
