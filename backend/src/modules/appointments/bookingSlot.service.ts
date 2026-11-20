import { DateTime } from 'luxon';
import { AppError } from '../../errors/AppError.js';
import type { Executor } from '../../utils/db.js';
import type { Settings } from '../settings/settings.repository.js';
import { readHours } from '../settings/settings.repository.js';
import { overlapping } from './appointments.repository.js';
import type { Interval } from './appointments.types.js';
import { bookingIntervals } from './intervals.js';
import { assertWorkingTime, canFit, sqlTime } from './schedule.js';

/** Comparte la regla de agenda entre las opciones visibles y la reserva efectiva.
 * @param start - Hora de inicio UTC, única entre las reservas no canceladas.
 * @param end - Fin UTC, excluido del intervalo.
 * @param capacity - Máximo de lavados en paralelo con inicios distintos.
 * @param intervals - Reservas que podrían cruzarse con el intervalo.
 * @param vehicleId - Vehículo a reservar, sin superposiciones propias.
 * @returns Si la hora de inicio está libre y el lavado completo cabe.
 */
export function canBookSlot(
  start: number,
  end: number,
  capacity: number,
  intervals: Interval[],
  vehicleId: string | null,
) {
  return (
    !intervals.some((v) => v.start === start) &&
    canFit(start, end, capacity, intervals, null, vehicleId)
  );
}
/** Revalida horario y ocupación dentro de la transacción que mantiene el lock de agenda.
 * @param startsAt - Inicio ISO con zona explícita, convertido a UTC antes de comparar.
 * @param duration - Duración completa del lavado en minutos.
 * @param vehicleId - Identificador del vehículo cuyo titular y disponibilidad se verifican.
 * @param settings - Configuración operativa vigente del negocio.
 * @param connection - Conexión de la transacción que conserva los bloqueos de esta operación.
 * @returns `Promise<{ start: number; end: number; }>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function assertBookingSlot(
  startsAt: string,
  duration: number,
  vehicleId: string | null,
  settings: Settings,
  connection: Executor,
) {
  const start = DateTime.fromISO(startsAt, { setZone: true }).toMillis();
  const end = start + duration * 60000;
  assertWorkingTime(start, end, settings, await readHours(connection));
  const existing = await overlapping(sqlTime(start), sqlTime(end), undefined, connection);
  if (
    !canBookSlot(
      start,
      end,
      settings.simultaneousCapacity,
      bookingIntervals(existing),
      vehicleId,
    )
  )
    throw new AppError(409, 'SLOT_UNAVAILABLE', 'Ese horario acaba de ocuparse. Elegí otro.');
  return { start, end };
}
