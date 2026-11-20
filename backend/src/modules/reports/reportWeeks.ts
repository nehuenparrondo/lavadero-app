import { DateTime } from 'luxon';
type Day = { date: string; revenueCents: number; washes: number };
type Week = { from: string; to: string; revenueCents: number; washes: number };

/** Agrupa los días locales en semanas ISO, incluyendo ceros y semanas parciales.
 * @param days Días del período ya contabilizados en la zona del negocio.
 * @returns Semanas de lunes a domingo recortadas al período solicitado, sin duplicar ingresos.
 */
export function reportWeeks(days: Day[]) {
  const weeks = new Map<string, Week>();
  for (const day of days) {
    const key = DateTime.fromISO(day.date, { zone: 'utc' }).startOf('week').toISODate()!;
    const week = weeks.get(key) ?? {
      from: day.date,
      to: day.date,
      revenueCents: 0,
      washes: 0,
    };
    week.to = day.date;
    week.revenueCents += day.revenueCents;
    week.washes += day.washes;
    weeks.set(key, week);
  }
  return [...weeks.values()];
}
