import { z } from 'zod';
/** Cobro idempotente en centavos ARS. Clave estable al reintentar desde móvil. */
export const paymentSchema = z
  .object({
    amountCents: z.number().int().min(1).max(100000000),
    method: z.enum(['cash', 'transfer']),
    reference: z.string().trim().max(100).nullable().optional(),
    idempotencyKey: z.uuid(),
  })
  .strict();
