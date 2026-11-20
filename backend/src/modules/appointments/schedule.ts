import { DateTime } from 'luxon';
import { AppError } from '../../errors/AppError.js';
import type { BusinessHour, Settings } from '../settings/settings.repository.js';
import type { Interval } from './appointments.types.js';

/** Interpreta un DATETIME de MySQL como UTC sin depender de la zona del servidor.
 * @param value - Entrada del formato declarado que se valida o transforma.
 * @returns `number`.
 */
export function utcMillis(value: string) {
  return DateTime.fromSQL(value, { zone: 'utc' }).toMillis();
}
/** Formato SQL UTC para persistir y comparar intervalos.
 * @param milliseconds - Instante UTC en milisegundos desde Unix epoch.
 * @returns `string`.
 */
export function sqlTime(milliseconds: number) {
  return DateTime.fromMillis(milliseconds, { zone: 'utc' }).toFormat(
    'yyyy-MM-dd HH:mm:ss.SSS',
  );
}
/** Fecha ISO pública con Z.
 * @param value - Entrada del formato declarado que se valida o transforma.
 * @returns `string | null`.
 */
export function isoTime(value: string) {
  return DateTime.fromSQL(value, { zone: 'utc' }).toISO();
}
/** Calcula ventana local de atención de una fecha. Devuelve null si está cerrado.
 * @param date - Fecha de calendario en formato AAAA-MM-DD.
 * @param settings - Configuración operativa vigente del negocio.
 * @param hours - Días y horarios de atención en la zona del negocio.
 * @returns `{ open: number; close: number; } | null`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function businessWindow(date: string, settings: Settings, hours: BusinessHour[]) {
  const day = DateTime.fromISO(date, { zone: settings.timeZone });
  if (!day.isValid) throw new AppError(400, 'INVALID_DATE', 'La fecha no es válida.');
  const h = hours.find((v) => v.weekday === day.weekday);
  if (!h) return null;
  const open = DateTime.fromISO(`${date}T${h.opensAt}`, { zone: settings.timeZone });
  const close = DateTime.fromISO(`${date}T${h.closesAt}`, { zone: settings.timeZone });
  return { open: open.toMillis(), close: close.toMillis() };
}

/** Exige que la finalización ocurra durante la jornada local vigente del negocio.
 * @param settings Configuración con la zona horaria del lavadero.
 * @param hours Horarios de atención por día de la semana.
 * @returns void cuando la hora del servidor está entre apertura incluida y cierre excluido.
 * @throws AppError Fuera de horario o en un día cerrado.
 */
export function assertCompletionTime(settings: Settings, hours: BusinessHour[]) {
  const now = DateTime.now().setZone(settings.timeZone);
  const window = businessWindow(now.toISODate()!, settings, hours);
  const instant = now.toMillis();
  if (!window || instant < window.open || instant >= window.close)
    throw new AppError(
      409,
      'OUTSIDE_BUSINESS_HOURS',
      'Solo se puede finalizar un lavado durante el horario de atención del lavadero.',
    );
}
/** Comprueba capacidad simultánea por barrido de eventos y exclusión de vehículo/empleado.
 * @param start Inicio UTC en milisegundos, incluido.
 * @param end Fin UTC en milisegundos, excluido.
 * @param capacity Máximo de vehículos concurrentes.
 * @param intervals Intervalos activos contra los que se compara la propuesta.
 * @param employeeId Empleado que no puede superponerse consigo mismo; opcional.
 * @param vehicleId Vehículo que no puede ocupar dos turnos simultáneos; opcional.
 * @returns true si no supera capacidad ni comparte vehículo/empleado durante el intervalo.
 * @remarks Los finales se procesan antes que los inicios empatados; turnos contiguos no se superponen.
 */
export function canFit(
  start: number,
  end: number,
  capacity: number,
  intervals: Interval[],
  employeeId?: string | null,
  vehicleId?: string | null,
) {
  const overlapping = intervals.filter((v) => v.start < end && v.end > start);
  if (
    overlapping.some(
      (v) =>
        (employeeId && v.employeeId === employeeId) ||
        (vehicleId && v.vehicleId === vehicleId),
    )
  )
    return false;
  const events = overlapping.flatMap((v) => [
    { at: Math.max(start, v.start), delta: 1 },
    { at: Math.min(end, v.end), delta: -1 },
  ]);
  events.push({ at: start, delta: 1 }, { at: end, delta: -1 });
  // Un fin (-1) libera capacidad antes de un inicio (+1) en el mismo instante.
  events.sort((a, b) => a.at - b.at || a.delta - b.delta);
  let used = 0;
  for (const event of events) {
    used += event.delta;
    if (used > capacity) return false;
  }
  return true;
}
/** Exige futuro, día abierto, alineación a grilla y finalización dentro de atención.
 * @param start - Inicio UTC en milisegundos; extremo incluido.
 * @param end - Fin UTC en milisegundos; extremo excluido.
 * @param settings - Configuración operativa vigente del negocio.
 * @param hours - Días y horarios de atención en la zona del negocio.
 * @returns `void`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function assertWorkingTime(
  start: number,
  end: number,
  settings: Settings,
  hours: BusinessHour[],
) {
  const local = DateTime.fromMillis(start, { zone: settings.timeZone });
  const window = businessWindow(local.toISODate()!, settings, hours);
  if (
    start <= Date.now() ||
    !window ||
    start < window.open ||
    end > window.close ||
    (start - window.open) % (settings.slotStepMinutes * 60000) !== 0
  )
    throw new AppError(
      409,
      'SLOT_UNAVAILABLE',
      'El horario no está disponible dentro de la atención del lavadero.',
    );
}
