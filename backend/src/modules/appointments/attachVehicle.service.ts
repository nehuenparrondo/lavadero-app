import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import { NotFoundError } from '../../errors/NotFoundError.js';
import type { Actor } from '../../types/domain.js';
import type { Executor } from '../../utils/db.js';
import { execute } from '../../utils/db.js';
import { transaction } from '../../utils/transaction.js';
import { readSettings } from '../settings/settings.repository.js';
import { findVehicle, insertVehicle } from '../vehicles/vehicles.repository.js';
import { assertAppointmentAccess } from './appointments.access.js';
import { findAppointment, overlapping } from './appointments.repository.js';
import type { Appointment } from './appointments.types.js';
import type { attachVehicleSchema } from './work.schema.js';

type Attachment = z.infer<typeof attachVehicleSchema>;

/** Vincula un vehículo a un turno ya confirmado bajo el mismo bloqueo que usa la agenda.
 * @param actor Cliente titular o administrador autenticado.
 * @param id Identificador del turno.
 * @param input Identificador de un vehículo propio o sus datos para crearlo.
 * @returns Identificador vinculado, incluso ante un reintento del mismo formulario.
 */
export function attachVehicle(actor: Actor, id: string, input: Attachment) {
  return transaction(async (connection) => {
    await readSettings(connection, true);
    const appointment = await findAppointment(id, connection, true);
    assertAppointmentAccess(actor, appointment);
    if (appointment.isWalkIn || !appointment.clientId)
      throw new AppError(
        409,
        'WALK_IN_VEHICLE_FIXED',
        'Los datos del ingreso presencial ya están guardados en el turno.',
      );
    if (appointment.vehicleId) return existingAttachment(appointment, input);
    if (appointment.status !== 'confirmed')
      throw new AppError(
        409,
        'ATTACHMENT_CLOSED',
        'Solo podés agregar el vehículo a un turno confirmado.',
      );
    const vehicleId = await resolveAttachment(appointment, input, connection);
    await execute(
      'UPDATE turnos SET vehicle_id=?,version=version+1 WHERE id=?',
      [vehicleId, id],
      connection,
    );
    return { vehicleId };
  });
}

/** Registra un vehículo nuevo con el tipo reservado o comprueba uno que ya existe. */
function resolveAttachment(appointment: Appointment, input: Attachment, connection: Executor) {
  if ('vehicleId' in input)
    return validateAttachment(appointment, input.vehicleId, connection);
  return insertVehicle(
    {
      ...input.vehicle,
      ownerId: appointment.clientId!,
      vehicleTypeId: appointment.vehicleTypeId,
    },
    connection,
  );
}

/** Reconoce el reintento de la misma alta y protege la identidad ya vinculada. */
function existingAttachment(appointment: Appointment, input: Attachment) {
  const matches =
    'vehicleId' in input
      ? input.vehicleId === appointment.vehicleId
      : input.vehicle.plate === appointment.plate;
  if (matches) return { vehicleId: appointment.vehicleId };
  throw new AppError(
    409,
    'VEHICLE_ALREADY_LINKED',
    'El turno ya tiene un vehículo vinculado.',
  );
}

/** Respeta titular, categoría cotizada y posibles reservas concurrentes del mismo vehículo. */
async function validateAttachment(appointment: Appointment, id: string, connection: Executor) {
  const vehicle = await findVehicle(id, connection);
  if (!vehicle || vehicle.deletedAt || vehicle.ownerId !== appointment.clientId)
    throw new NotFoundError();
  if (vehicle.vehicleTypeId !== appointment.vehicleTypeId)
    throw new AppError(
      409,
      'VEHICLE_TYPE_MISMATCH',
      'El vehículo tiene que ser del tipo que elegiste al reservar.',
    );
  const other = await overlapping(
    appointment.startsAt,
    appointment.endsAt,
    appointment.id,
    connection,
  );
  if (other.some((v) => v.vehicleId === id))
    throw new AppError(
      409,
      'VEHICLE_ALREADY_BOOKED',
      'Ese vehículo ya tiene otro turno que se cruza con este.',
    );
  return id;
}
