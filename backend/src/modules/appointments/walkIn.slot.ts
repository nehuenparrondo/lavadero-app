import { DateTime } from 'luxon';
import { AppError } from '../../errors/AppError.js';
import type { Executor } from '../../utils/db.js';
import { readHours, type Settings } from '../settings/settings.repository.js';
import { overlapping } from './appointments.repository.js';
import { bookingIntervals } from './intervals.js';
import { canBookSlot } from './bookingSlot.service.js';
import { businessWindow, sqlTime } from './schedule.js';

/** Elige la primera ventana de hoy bajo el mismo lock que las reservas de clientes.
 * @param duration Minutos completos de los servicios.
 * @param settings Configuración vigente bloqueada por la transacción.
 * @param vehicleId Identidad de un auto registrado, opcional.
 * @param connection Transacción del ingreso.
 * @returns Inicio y fin UTC SQL y límites del día para comprobar duplicados.
 */
export async function walkInSlot(
  duration: number,
  settings: Settings,
  vehicleId: string | null,
  connection: Executor,
) {
  const now = DateTime.now().setZone(settings.timeZone);
  const window = businessWindow(now.toISODate()!, settings, await readHours(connection));
  if (!window || now.toMillis() < window.open || now.toMillis() >= window.close)
    throw new AppError(
      409,
      'OUTSIDE_BUSINESS_HOURS',
      'Los ingresos sin turno se registran durante el horario de atención.',
    );
  const intervals = bookingIntervals(
    await overlapping(sqlTime(window.open), sqlTime(window.close), undefined, connection),
  );
  const step = settings.slotStepMinutes * 60000;
  const first = window.open + Math.ceil((now.toMillis() - window.open) / step) * step;
  for (let start = first; start + duration * 60000 <= window.close; start += step) {
    const end = start + duration * 60000;
    if (canBookSlot(start, end, settings.simultaneousCapacity, intervals, vehicleId))
      return {
        startsAt: sqlTime(start),
        endsAt: sqlTime(end),
        dayStart: sqlTime(now.startOf('day').toMillis()),
        dayEnd: sqlTime(now.plus({ days: 1 }).startOf('day').toMillis()),
      };
  }
  throw new AppError(
    409,
    'DAY_FULL',
    'Hoy no queda lugar para completar estos servicios. Podés registrar una reserva para otro día.',
  );
}
