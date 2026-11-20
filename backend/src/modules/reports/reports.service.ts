import type { z } from 'zod';
import { aggregateReport } from './reportAggregation.js';
import * as repo from './reports.repository.js';
import type { reportSchema } from './reports.schema.js';
import { reportWindow } from './reports.window.js';
import { reportWeeks } from './reportWeeks.js';
/** Reporte administrativo: lavados, ingresos, populares y rendimiento por empleado.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns Promesa de un objeto con period, from, to, currencyCode, totalWashes, revenueCents, days, services, employees.
 */
export async function businessReport(input: z.infer<typeof reportSchema>) {
  const range = await reportWindow(input);
  const [work, payments, services] = await Promise.all([
    repo.completedWork(range.from, range.to),
    repo.revenue(range.from, range.to),
    repo.popularServices(range.from, range.to),
  ]);
  const { days, employees } = aggregateReport(range, work, payments);
  return {
    period: input.period,
    from: range.start.toISODate(),
    to: range.end.minus({ days: 1 }).toISODate(),
    currencyCode: 'ARS',
    totalWashes: work.length,
    revenueCents: payments.reduce((sum, p) => sum + Number(p.amountCents), 0),
    days: [...days.values()],
    weeks: reportWeeks([...days.values()]),
    services: services.map((service) => ({
      name: String(service.name),
      count: Number(service.count),
    })),
    employees: [...employees.values()],
  };
}
/** Resumen de la jornada compartida, sin datos financieros.
 * @param _id Identidad autenticada conservada por compatibilidad; no restringe la jornada compartida.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<{ date: string; completed: number; pending: number; }>`.
 */
export async function personalReport(_id: string, input: z.infer<typeof reportSchema>) {
  const range = await reportWindow({ ...input, period: 'day' });
  const counts = await repo.employeeSummary(range.from, range.to);
  return {
    date: range.start.toISODate(),
    completed: Number(counts.find((c) => c.status === 'completed')?.count ?? 0),
    pending: counts
      .filter((c) =>
        ['pending', 'confirmed', 'in_progress', 'awaiting_review'].includes(String(c.status)),
      )
      .reduce((sum, c) => sum + Number(c.count), 0),
  };
}
