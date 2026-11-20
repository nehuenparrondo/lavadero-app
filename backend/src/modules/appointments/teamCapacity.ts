import { AppError } from '../../errors/AppError.js';
import type { Executor } from '../../utils/db.js';
import type { Appointment } from './appointments.types.js';
import { overlapping } from './appointments.repository.js';
import { bookingIntervals } from './intervals.js';
import { canFit, utcMillis } from './schedule.js';
/** Revalida capacidad física y vehículo al activar un turno, sin exclusividad por empleado.
 * @param appointment Turno bloqueado por el llamador bajo el lock común de agenda.
 * @param capacity Cantidad de autos que el negocio admite simultáneamente.
 * @param connection Transacción que serializa reservas y cambios de estado.
 * @returns Promesa vacía si la capacidad continúa disponible.
 * @throws AppError Si reactivar un turno excedería la capacidad o duplicaría el vehículo.
 */
export async function assertTeamCapacity(
  appointment: Appointment,
  capacity: number,
  connection: Executor,
) {
  const existing = await overlapping(
    appointment.startsAt,
    appointment.endsAt,
    appointment.id,
    connection,
  );
  const fits = canFit(
    utcMillis(appointment.startsAt),
    utcMillis(appointment.endsAt),
    capacity,
    bookingIntervals(existing),
    null,
    appointment.vehicleId,
  );
  if (!fits)
    throw new AppError(
      409,
      'SLOT_UNAVAILABLE',
      'La capacidad o el vehículo no están disponibles.',
    );
}
