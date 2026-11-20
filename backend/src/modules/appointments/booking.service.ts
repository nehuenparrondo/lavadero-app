import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import type { Actor } from '../../types/domain.js';
import type { Executor } from '../../utils/db.js';
import { transaction } from '../../utils/transaction.js';
import type { Settings } from '../settings/settings.repository.js';
import { readSettings } from '../settings/settings.repository.js';
import { findUser } from '../users/users.repository.js';
import { presentAppointment } from './appointments.access.js';
import * as repo from './appointments.repository.js';
import type { appointmentSchema } from './appointments.schema.js';
import type { QuoteItem } from './appointments.types.js';
import { quote } from './bookingQuote.service.js';
import { assertBookingSlot } from './bookingSlot.service.js';
import { assignAvailableEmployee } from './responsibility.repository.js';
import { sqlTime } from './schedule.js';

type BookingInput = z.infer<typeof appointmentSchema>;

/** Reserva y guarda el contrato histórico bajo el bloqueo compartido de agenda.
 * @param actor Actor autenticado; un cliente solo reserva para su propio vehículo.
 * @param input Vehículo, servicios e inicio; clientId es opcional para reserva asistida.
 * @returns Turno confirmado automáticamente para la agenda compartida con precios y duraciones recalculados por el servidor.
 * @throws AppError Si falta configuración, el titular no corresponde o el horario se ocupó.
 * @remarks El lock de settings serializa reservas, asignaciones y cambios de configuración.
 */
export async function createAppointment(actor: Actor, input: BookingInput) {
  return transaction(async (connection) => {
    const settings = await readSettings(connection, true);
    if (!settings) throw new AppError(503, 'SETTINGS_MISSING', 'Falta configurar el negocio.');
    const quoted = await quote(actor, input, connection);
    const booking = await prepareBooking(actor, input, quoted, settings, connection);
    return persistBooking(actor, booking, quoted.items, connection);
  });
}

/** Resuelve titular y ventana libre para el contrato que va a persistirse. */
async function prepareBooking(
  actor: Actor,
  input: BookingInput,
  quoted: Awaited<ReturnType<typeof quote>>,
  settings: Settings,
  connection: Executor,
) {
  const owner = quoted.vehicle?.ownerId;
  const vehicleId = quoted.vehicle?.id ?? null;
  const clientId = await validateClient(actor, input.clientId, owner, connection);
  const { start, end } = await assertBookingSlot(
    input.startsAt,
    quoted.durationMinutes,
    vehicleId,
    settings,
    connection,
  );
  return {
    clientId,
    vehicleId,
    vehicleTypeId: quoted.typeId,
    startsAt: sqlTime(start),
    endsAt: sqlTime(end),
    createdById: actor.id,
    currencyCode: settings.currencyCode,
  };
}

/** Comprueba titular activo y correspondencia de la reserva bajo el lock común. */
async function validateClient(
  actor: Actor,
  requestedId: string | undefined,
  ownerId: string | undefined,
  connection: Executor,
) {
  const clientId = requestedId ?? ownerId ?? actor.id;
  const client = await findUser(clientId, connection);
  if (
    !client ||
    !client.isActive ||
    client.deletedAt ||
    client.role !== 'client' ||
    (ownerId !== undefined && clientId !== ownerId) ||
    (actor.role === 'client' && clientId !== actor.id)
  )
    throw new AppError(
      403,
      'INVALID_CLIENT',
      'La reserva debe corresponder al titular del vehículo.',
    );
  return clientId;
}

/** Persiste el contrato histórico y el primer estado en la misma transacción. */
async function persistBooking(
  actor: Actor,
  booking: Parameters<typeof repo.insertAppointment>[0],
  items: QuoteItem[],
  connection: Executor,
) {
  const id = await repo.insertAppointment(booking, connection);
  await repo.insertItems(id, items, connection);
  await assignAvailableEmployee(id, booking.startsAt, booking.endsAt, connection);
  await repo.setStatus(id, 'confirmed', actor.id, connection);
  return presentAppointment((await repo.findAppointment(id, connection))!, actor);
}
