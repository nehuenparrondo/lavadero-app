import type { Request } from 'express';
import { actor } from '../../utils/http.js';
import { reportSchema } from './reports.schema.js';
import { businessReport, personalReport } from './reports.service.js';
/** Reporte administrativo.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns Promesa de un objeto con period, from, to, currencyCode, totalWashes, revenueCents, days, services, employees.
 */
export function business(r: Request) {
  return businessReport(reportSchema.parse(r.query));
}
/** Resumen propio de empleado.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ date: string; completed: number; pending: number; }>`.
 */
export function personal(r: Request) {
  return personalReport(actor(r).id, reportSchema.parse(r.query));
}
