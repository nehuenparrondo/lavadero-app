import { DateTime } from 'luxon';
import type { BusinessHour, Settings } from '../settings/settings.repository.js';
import { businessWindow } from '../appointments/schedule.js';

/** Determina si el reloj oficial permite fichar hoy, sin aceptar horas del navegador.
 * @param settings Zona del negocio y configuración de agenda.
 * @param hours Días laborales y horas locales vigentes.
 * @returns Fecha oficial, permiso y explicación para la pantalla administrativa.
 */
export function attendanceWindow(settings: Settings, hours: BusinessHour[]) {
  const now = DateTime.now().setZone(settings.timeZone);
  const today = now.toISODate()!;
  const window = businessWindow(today, settings, hours);
  const canRecord = Boolean(
    window && now.toMillis() >= window.open && now.toMillis() < window.close,
  );
  const recordReason = canRecord
    ? null
    : 'Solo se puede fichar la llegada en un día laboral y dentro del horario de atención.';
  return { today, canRecord, recordReason };
}
