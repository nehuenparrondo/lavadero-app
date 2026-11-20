import { DateTime } from 'luxon';
import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import { getSettings } from '../settings/settings.service.js';
import type { reportSchema } from './reports.schema.js';
/** Resuelve límites de un día/semana/mes con calendario y zona IANA del negocio.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns Promesa de un objeto con settings, start, end, from, to.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function reportWindow(input: z.infer<typeof reportSchema>) {
  const settings = await getSettings();
  const at = input.date
    ? DateTime.fromISO(input.date, { zone: settings.timeZone })
    : DateTime.now().setZone(settings.timeZone);
  if (!at.isValid)
    throw new AppError(400, 'INVALID_DATE', 'La fecha del reporte no es válida.');
  const start = at.startOf(input.period);
  const end =
    input.period === 'day'
      ? start.plus({ days: 1 })
      : input.period === 'week'
        ? start.plus({ weeks: 1 })
        : start.plus({ months: 1 });
  return {
    settings,
    start,
    end,
    from: start.toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
    to: end.toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
  };
}

/** Ventana de calendario común al resumen personal y al reporte del negocio. */
export type ReportRange = Awaited<ReturnType<typeof reportWindow>>;
