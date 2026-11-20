import { z } from 'zod';
import { priceSchema } from '../services/services.schema.js';
const typePrices = z
  .array(priceSchema.extend({ serviceId: z.string().regex(/^[1-9]\d{0,18}$/u) }))
  .max(100)
  .refine(
    (prices) => new Set(prices.map((p) => p.serviceId)).size === prices.length,
    'No repitas servicios.',
  );
/** Tipo de vehículo administrable con código estable. */
export const vehicleTypeSchema = z
  .object({
    code: z.string().regex(/^[a-z0-9_-]{2,24}$/u),
    name: z.string().trim().min(1).max(80),
    isActive: z.boolean().default(true),
    prices: typePrices.optional(),
  })
  .strict();
