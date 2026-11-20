import { z } from 'zod';
import { vehicleSchema } from '../vehicles/vehicles.schema.js';

/** Datos adicionales del auto ingresados después de confirmar. */
export const vehicleDetailSchema = z
  .object({ description: z.string().trim().max(1000) })
  .strict();

/** Descripción obligatoria del trabajo realizado. */
export const washSchema = z
  .object({ description: z.string().trim().min(1).max(2000) })
  .strict();

const submissionId = z.string().regex(/^[1-9]\d{0,18}$/u);
/** Identidad existente o nuevo vehículo sin tipo ni dueño editable desde la reserva. */
export const attachVehicleSchema = z.union([
  z.object({ vehicleId: submissionId }).strict(),
  z.object({ vehicle: vehicleSchema.omit({ ownerId: true, vehicleTypeId: true }) }).strict(),
]);
/** Una devolución requiere instrucciones para el empleado. */
export const reviewSchema = z.discriminatedUnion('decision', [
  z
    .object({
      submissionId,
      decision: z.literal('approved'),
      note: z.string().trim().max(1000).optional(),
    })
    .strict(),
  z
    .object({
      submissionId,
      decision: z.literal('returned'),
      note: z.string().trim().min(1).max(1000),
    })
    .strict(),
]);
