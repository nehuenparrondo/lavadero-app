import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import type { Executor } from '../../utils/db.js';
import type { Settings } from '../settings/settings.repository.js';
import type { Actor } from '../../types/domain.js';
import { transaction } from '../../utils/transaction.js';
import { readSettings } from '../settings/settings.repository.js';
import { presentAppointment } from './appointments.access.js';
import {
  findAppointment,
  insertAppointment,
  insertItems,
  setStatus,
} from './appointments.repository.js';
import { quote } from './bookingQuote.service.js';
import { assignAvailableEmployee } from './responsibility.repository.js';
import {
  previousArrival,
  registeredArrival,
  hasActiveArrival,
  saveArrival,
} from './walkIn.repository.js';
import type { walkInSchema } from './walkIn.schema.js';
import { walkInSlot } from './walkIn.slot.js';

/** Registra llegada, contrato y observaciones atómicamente; nunca crea cuentas ficticias.
 * @param actor Administrador autenticado por la ruta.
 * @param input Datos mínimos del ingreso presencial.
 * @returns Turno confirmado, o el mismo turno ante un reintento de su UUID.
 */
export function createWalkIn(actor: Actor, input: z.infer<typeof walkInSchema>) {
  return transaction(async (connection) => {
    const settings = await readSettings(connection, true);
    if (!settings) throw new AppError(503, 'SETTINGS_MISSING', 'Falta configurar el negocio.');
    const previous = await previousArrival(input.requestId, connection);
    if (previous)
      return presentAppointment(
        (await findAppointment(String(previous.id), connection))!,
        actor,
      );
    const { car, quoted, slot } = await prepareArrival(actor, input, settings, connection);
    return persistArrival(actor, input, { car, quoted, slot }, settings, connection);
  });
}

/** Cotiza y evita duplicados antes de persistir una sola fila. */
async function prepareArrival(
  actor: Actor,
  input: z.infer<typeof walkInSchema>,
  settings: Settings,
  connection: Executor,
) {
  const car = await registeredArrival(input.plate, connection);
  if (car && car.typeId !== input.vehicleTypeId)
    throw new AppError(
      409,
      'VEHICLE_TYPE_MISMATCH',
      'Esta patente está registrada con otro tipo de vehículo. Revisá la categoría.',
    );
  const quoted = await quote(
    actor,
    { vehicleTypeId: input.vehicleTypeId, serviceIds: input.serviceIds },
    connection,
  );
  const slot = await walkInSlot(quoted.durationMinutes, settings, car?.id ?? null, connection);
  if (await hasActiveArrival(input.plate, slot.dayStart, slot.dayEnd, connection))
    throw new AppError(
      409,
      'CAR_ALREADY_QUEUED',
      'Esta patente ya tiene un turno activo hoy. Buscala en Turnos.',
    );
  return { car, quoted, slot };
}

/** Conserva todos los renglones dentro de la transacción del ingreso. */
async function persistArrival(
  actor: Actor,
  input: z.infer<typeof walkInSchema>,
  prepared: Awaited<ReturnType<typeof prepareArrival>>,
  settings: Settings,
  connection: Executor,
) {
  const { car, quoted, slot } = prepared;
  const id = await insertAppointment(
    {
      clientId: car?.clientId ?? null,
      vehicleId: car?.id ?? null,
      vehicleTypeId: input.vehicleTypeId,
      ...slot,
      createdById: actor.id,
      currencyCode: settings.currencyCode,
    },
    connection,
  );
  await saveArrival(id, input, actor.id, connection);
  await insertItems(id, quoted.items, connection);
  await assignAvailableEmployee(id, slot.startsAt, slot.endsAt, connection);
  await setStatus(id, 'confirmed', actor.id, connection);
  return presentAppointment((await findAppointment(id, connection))!, actor);
}
