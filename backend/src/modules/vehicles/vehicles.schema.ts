import { z } from 'zod';
/** Formulario de vehículo: el cliente no puede seleccionar un dueño ajeno. */
export const vehicleSchema = z
  .object({
    plate: z
      .string()
      .trim()
      .min(3)
      .max(16)
      .regex(/^[a-zA-Z0-9 -]+$/u)
      .transform((v) => v.replace(/[ -]/gu, '').toUpperCase())
      .refine((v) => v.length >= 3, 'Ingresá una patente válida.'),
    brand: z.string().trim().min(1).max(80),
    model: z.string().trim().min(1).max(80),
    color: z.string().trim().min(1).max(50),
    vehicleTypeId: z.string().regex(/^[1-9]\d*$/u),
    ownerId: z
      .string()
      .regex(/^[1-9]\d*$/u)
      .optional(),
  })
  .strict();
/** Edición parcial, siempre validada como vehículo completo al combinarse en el servicio. */
export const vehiclePatchSchema = vehicleSchema.partial();
