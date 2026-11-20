import { z } from 'zod';
/** Servicio administrable con duración explícita en minutos. */
export const serviceSchema = z
  .object({
    code: z.string().regex(/^[a-z0-9_-]{2,40}$/u),
    name: z.string().trim().min(1).max(100),
    description: z.string().trim().min(1).max(3000),
    durationMinutes: z.number().int().min(5).max(420),
    isActive: z.boolean().default(true),
  })
  .strict();
/** Precio en centavos ARS. */
export const priceSchema = z
  .object({ priceCents: z.number().int().min(1).max(100000000) })
  .strict();
/** Actualización parcial del servicio. */
export const servicePatchSchema = serviceSchema.partial();
