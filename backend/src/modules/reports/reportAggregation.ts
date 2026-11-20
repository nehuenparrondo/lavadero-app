import { DateTime } from 'luxon';
import type { RowDataPacket } from 'mysql2/promise';
import type { ReportRange } from './reports.window.js';
type Day = { date: string; washes: number; revenueCents: number };
type Employee = { id: string; name: string; completed: number };
/** Completa días vacíos y acumula trabajo e ingresos según sus fechas respectivas.
 * @param range - Período UTC calculado desde el calendario del negocio.
 * @param work - Lavados completados del período usados para agregar actividad.
 * @param payments - Cobros registrados en el período, expresados en centavos.
 * @returns `{ days: Map<string, Day>; employees: Map<string, Employee>; }`.
 */
export function aggregateReport(
  range: ReportRange,
  work: RowDataPacket[],
  payments: RowDataPacket[],
) {
  const days = new Map<string, Day>();
  const employees = new Map<string, Employee>();
  for (let d = range.start; d < range.end; d = d.plus({ days: 1 }))
    days.set(d.toISODate()!, { date: d.toISODate()!, washes: 0, revenueCents: 0 });
  aggregateWork(work, range.settings.timeZone, days, employees);
  for (const payment of payments) {
    const day = DateTime.fromSQL(payment.paidAt, { zone: 'utc' })
      .setZone(range.settings.timeZone)
      .toISODate()!;
    const bucket = days.get(day);
    if (bucket) bucket.revenueCents += Number(payment.amountCents);
  }
  return { days, employees };
}
/** El rendimiento usa la jornada del trabajo, no el día en que se registró el cobro. */
function aggregateWork(
  work: RowDataPacket[],
  timeZone: string,
  days: Map<string, Day>,
  employees: Map<string, Employee>,
) {
  for (const item of work) {
    const day = DateTime.fromSQL(item.endsAt, { zone: 'utc' }).setZone(timeZone).toISODate()!;
    const bucket = days.get(day);
    if (bucket) bucket.washes++;
    const id = String(item.employeeId);
    const employee = employees.get(id) ?? {
      id,
      name: String(item.employeeName ?? 'Sin asignar'),
      completed: 0,
    };
    employee.completed++;
    employees.set(id, employee);
  }
}
