import { DateTime } from 'luxon';
import { AppError } from '../../errors/AppError.js';
import type { Actor } from '../../types/domain.js';
import { transaction } from '../../utils/transaction.js';
import { isoTime } from '../appointments/schedule.js';
import { readHours, readSettings } from '../settings/settings.repository.js';
import { findUser } from '../users/users.repository.js';
import { insertArrival, readAttendance } from './attendance.repository.js';
import { attendanceWindow } from './attendance.window.js';

/** Consulta fichajes por fecha argentina, con un registro como máximo por persona y día.
 * @param requestedDate - Fecha local opcional; por defecto se consulta hoy.
 * @returns Fecha de consulta, día actual y llegadas.
 */
export async function getAttendance(requestedDate?: string) {
  const settings = await readSettings();
  if (!settings) throw new AppError(503, 'SETTINGS_MISSING', 'Falta configurar el negocio.');
  const window = attendanceWindow(settings, await readHours());
  const { today } = window;
  const date = requestedDate ?? today;
  if (!DateTime.fromISO(date, { zone: settings.timeZone }).isValid)
    throw new AppError(400, 'INVALID_DATE', 'La fecha no es válida.');
  const items = await readAttendance(date, date === today);
  return {
    date,
    today,
    canRecord: date === today && window.canRecord,
    recordReason:
      date === today
        ? window.recordReason
        : 'Los fichajes históricos son de consulta. Volvé a hoy para registrar una llegada.',
    items: items.map((row) => ({
      ...row,
      arrivedAt: row.arrivedAt ? isoTime(row.arrivedAt) : null,
    })),
  };
}

/** Ficha una llegada observada por Administración con el reloj del servidor y el día del negocio.
 * @param admin - Autor autenticado; employeeId y expectedDate identifican el fichaje.
 * @returns Confirmación del registro y fecha.
 */
export function recordArrival(admin: Actor, employeeId: string, expectedDate: string) {
  return transaction(async (connection) => {
    const settings = await readSettings(connection, true);
    if (!settings) throw new AppError(503, 'SETTINGS_MISSING', 'Falta configurar el negocio.');
    const { today, canRecord, recordReason } = attendanceWindow(
      settings,
      await readHours(connection),
    );
    if (expectedDate !== today)
      throw new AppError(
        409,
        'ATTENDANCE_DATE_CHANGED',
        'Actualizá la vista antes de fichar la llegada de hoy.',
      );
    if (!canRecord) throw new AppError(409, 'OUTSIDE_BUSINESS_HOURS', recordReason!);
    const employee = await findUser(employeeId, connection, true);
    if (employee?.role !== 'employee' || !employee.isActive || employee.deletedAt)
      throw new AppError(400, 'INVALID_EMPLOYEE', 'Seleccioná un empleado activo.');
    await insertArrival(today, employeeId, admin.id, connection);
    return { recorded: true, date: today };
  });
}
