import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import type { Actor } from '../../types/domain.js';
import { readSettings } from '../settings/settings.repository.js';
import { assertAppointmentAccess, presentAppointment } from './appointments.access.js';
import { appointmentFilter } from './appointments.filters.repository.js';
import * as repo from './appointments.repository.js';
import type { appointmentQuerySchema } from './appointments.schema.js';
import * as notesRepo from './notes.repository.js';
import { presentWash } from './wash.service.js';
import { isoTime } from './schedule.js';

/** Lista turnos propios para clientes y agenda compartida para el equipo y admite filtros administrativos sin ampliar acceso.
 * @param actor - Actor autenticado por el middleware; determina rol y propiedad.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns Promesa de un objeto con items, total, page, limit.
 */
export async function listAppointments(
  actor: Actor,
  input: z.infer<typeof appointmentQuerySchema>,
) {
  if (input.queue && actor.role !== 'admin')
    throw new AppError(403, 'FORBIDDEN', 'Esta bandeja es de administración.');
  const settings = await readSettings();
  const { where, values } = appointmentFilter(actor, input, settings?.timeZone ?? 'UTC');
  const result = await repo.listAppointments(
    where,
    values,
    input.page,
    input.limit,
    input.queue
      ? 'NEWEST'
      : input.scope === 'today' || input.history === 'false' || input.date
        ? 'ASC'
        : 'DESC',
  );
  return { ...result, items: result.items.map((v) => presentAppointment(v, actor)) };
}
/** Detalle autorizado con servicios/observaciones; empleado recibe solo datos operativos.
 * @param actor - Actor autenticado por el middleware; determina rol y propiedad.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns Promesa de un objeto con services, notes, totalCents, paidCents, currencyCode, id, status, startsAt, endsAt, plate.
 */
export async function getAppointment(actor: Actor, id: string) {
  const appointment = await repo.findAppointment(id);
  assertAppointmentAccess(actor, appointment);
  const [items, notes, wash] = await Promise.all([
    repo.readItems(id),
    notesRepo.readNotes(id),
    presentWash(actor, id),
  ]);
  return {
    ...presentAppointment(appointment, actor),
    vehicleDescription: appointment.vehicleDescription,
    wash,
    services:
      actor.role === 'employee'
        ? items.map((i) => ({
            serviceId: i.serviceId,
            name: i.name,
            durationMinutes: i.durationMinutes,
          }))
        : items,
    notes: notes.map((note) => ({ ...note, createdAt: isoTime(String(note.createdAt)) })),
  };
}
/** Registra observación por el equipo o administrador, con autor autenticado.
 * @param actor - Actor autenticado por el middleware; determina rol y propiedad.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param body - Carga validada de la operación de escritura.
 * @returns `Promise<{ created: boolean; }>`.
 */
export async function addNote(actor: Actor, id: string, body: string) {
  const appointment = await repo.findAppointment(id);
  assertAppointmentAccess(actor, appointment);
  await notesRepo.insertNote(id, actor.id, body);
  return { created: true };
}
/** Comprobante de trabajo finalizado, visible al dueño y admin. No equivale a una factura fiscal.
 * @param actor - Actor autenticado por el middleware; determina rol y propiedad.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns Promesa de un objeto con receiptNumber, issuedAt, fiscalInvoice, services, notes, totalCents, paidCents, currencyCode, id, status.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function receipt(actor: Actor, id: string) {
  const appointment = await repo.findAppointment(id);
  assertAppointmentAccess(actor, appointment);
  if (appointment.status !== 'completed')
    throw new AppError(
      409,
      'NOT_COMPLETED',
      'El comprobante está disponible al finalizar el trabajo.',
    );
  return {
    ...(await getAppointment(actor, id)),
    receiptNumber: `LAV-${id}`,
    issuedAt: new Date().toISOString(),
    fiscalInvoice: false,
  };
}
