import type { Request } from 'express';
import type { z } from 'zod';
import { actor, paramId } from '../../utils/http.js';
import type {
  appointmentSchema,
  assignmentSchema,
  cancelSchema,
  noteSchema,
  statusSchema,
} from './appointments.schema.js';
import { appointmentQuerySchema, availabilitySchema } from './appointments.schema.js';
import * as service from './appointments.service.js';
import { availability } from './availability.service.js';
import { createAppointment } from './booking.service.js';
import { assignEmployee, changeStatus } from './mutation.service.js';
/** Lista por rol y filtros.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns Promesa de un objeto con items, total, page, limit.
 */
export function list(r: Request) {
  return service.listAppointments(actor(r), appointmentQuerySchema.parse(r.query));
}
/** Detalle autorizado.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns Promesa de un objeto con services, notes, totalCents, paidCents, currencyCode, id, status, startsAt, endsAt, plate.
 */
export function get(r: Request) {
  return service.getAppointment(actor(r), paramId(r));
}
/** Cotización/horarios.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ items: import("./appointments.types.js").QuoteItem[]; totalCents: number; durationMinutes: number; slots: string[]; currencyCode: string; }>`.
 */
export function slots(r: Request) {
  return availability(actor(r), availabilitySchema.parse(r.query));
}
/** Alta de turno.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns Promesa de un objeto con totalCents, paidCents, currencyCode, id, status, startsAt, endsAt, plate, brand, model.
 */
export function create(r: Request) {
  return createAppointment(actor(r), r.body as z.infer<typeof appointmentSchema>);
}
/** Cambio de estado por empleado o admin.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ updated: boolean; status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"; }>`.
 */
export function status(r: Request) {
  return changeStatus(actor(r), paramId(r), (r.body as z.infer<typeof statusSchema>).status);
}
/** Cancelación del cliente/admin.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ updated: boolean; status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"; }>`.
 */
export function cancel(r: Request) {
  return changeStatus(
    actor(r),
    paramId(r),
    'cancelled',
    (r.body as z.infer<typeof cancelSchema>).reason,
  );
}
/** Asignación administrativa.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ assigned: boolean; }>`.
 */
export function assign(r: Request) {
  return assignEmployee(
    actor(r),
    paramId(r),
    (r.body as z.infer<typeof assignmentSchema>).employeeId,
  );
}
/** Observación de trabajo.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ created: boolean; }>`.
 */
export function note(r: Request) {
  return service.addNote(actor(r), paramId(r), (r.body as z.infer<typeof noteSchema>).body);
}
/** Comprobante histórico.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns Promesa de un objeto con receiptNumber, issuedAt, fiscalInvoice, services, notes, totalCents, paidCents, currencyCode, id, status.
 */
export function receipt(r: Request) {
  return service.receipt(actor(r), paramId(r));
}
