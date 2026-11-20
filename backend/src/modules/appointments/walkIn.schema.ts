import { z } from 'zod';
import { vehicleSchema } from '../vehicles/vehicles.schema.js';

/** Alta presencial mínima; el servidor decide horario, importes y responsable. */
export const walkInSchema = z
  .object({
    requestId: z.uuid(),
    plate: vehicleSchema.shape.plate,
    vehicleTypeId: vehicleSchema.shape.vehicleTypeId,
    serviceIds: z
      .array(z.string().regex(/^[1-9]\d*$/u))
      .min(1)
      .max(10)
      .refine((ids) => new Set(ids).size === ids.length),
    customerName: z.string().trim().max(160).default(''),
    customerPhone: z.string().trim().max(30).default(''),
    brand: z.string().trim().max(80).default(''),
    model: z.string().trim().max(80).default(''),
    color: z.string().trim().max(50).default(''),
    notes: z.string().trim().max(2000).default(''),
  })
  .strict();
