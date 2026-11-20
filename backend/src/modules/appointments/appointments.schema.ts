import { z } from 'zod';
import { APPOINTMENT_STATUS } from '../../constants/business.js';
import { paginationSchema } from '../../utils/pagination.js';
const id = z.string().regex(/^[1-9]\d{0,18}$/u);
const target = { vehicleId: id.optional(), vehicleTypeId: id.optional() };
const oneTarget = (value: {
  vehicleId?: string | undefined;
  vehicleTypeId?: string | undefined;
}) => Boolean(value.vehicleId) !== Boolean(value.vehicleTypeId);
/** Valores únicos y acotados evitan consultas y totales ambiguos. */
export const serviceIdsSchema = z
  .array(id)
  .min(1)
  .max(10)
  .refine((v) => new Set(v).size === v.length, 'No repitas servicios.');
/** Alta de reserva: fechas ISO con offset, convertidas a UTC. */
export const appointmentSchema = z
  .object({
    ...target,
    serviceIds: serviceIdsSchema,
    startsAt: z.string().datetime({ offset: true }),
    clientId: id.optional(),
  })
  .strict()
  .refine(oneTarget, 'Elegí un vehículo o un tipo de vehículo.');
/** Búsqueda y filtros; servicio limita visibilidad según rol. */
export const appointmentQuerySchema = paginationSchema.extend({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/u)
    .optional(),
  status: z.enum(APPOINTMENT_STATUS).optional(),
  clientId: id.optional(),
  employeeId: id.optional(),
  plate: z
    .string()
    .trim()
    .regex(/^[a-z0-9 -]{1,24}$/iu)
    .optional(),
  history: z.enum(['true', 'false']).optional(),
  queue: z.enum(['requested']).optional(),
  scope: z.enum(['today', 'all']).optional(),
  home: z.enum(['true']).optional(),
});
/** Selección de disponibilidad sin crear reservas. */
export const availabilitySchema = z
  .object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/u),
    ...target,
    serviceIds: z.preprocess(
      (v) => (typeof v === 'string' ? v.split(',') : v),
      serviceIdsSchema,
    ),
  })
  .refine(oneTarget, 'Elegí un vehículo o un tipo de vehículo.');
/** Estados admitidos; la transición se decide exclusivamente en service. */
export const statusSchema = z
  .object({
    status: z.enum(APPOINTMENT_STATUS),
  })
  .strict();
/** Solo un administrador puede elegir empleado. */
export const assignmentSchema = z.object({ employeeId: id }).strict();
/** Cancelación con un motivo obligatorio que el titular puede consultar. */
export const cancelSchema = z
  .object({
    reason: z.string().trim().min(1, 'Escribí el motivo de la cancelación.').max(500),
  })
  .strict();
/** Observación atribuida al actor, no a un autor elegido en el body. */
export const noteSchema = z.object({ body: z.string().trim().min(1).max(2000) }).strict();
