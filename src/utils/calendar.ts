/** Valida fecha real de calendario sin normalizar 31 de febrero a otro mes.
 * @param value Fecha ISO sin hora.
 * @returns true solo para días existentes en el calendario gregoriano.
 */
export function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false;
  const parsed = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}
/** Cambia de mes conservando el día uno para evitar saltos por meses de distinta duración.
 * @param month Mes ISO AAAA-MM.
 * @param delta Número de meses, positivo o negativo.
 * @returns Nuevo mes ISO.
 */
export function shiftMonth(month: string, delta: number) {
  const date = new Date(`${month}-01T12:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + delta);
  return date.toISOString().slice(0, 7);
}
/** Genera seis semanas de lunes a domingo; las celdas ajenas al mes quedan vacías.
 * @param month Mes ISO AAAA-MM.
 * @returns 42 celdas, cada día con su fecha completa para selección accesible.
 */
export function calendarDays(month: string) {
  const first = new Date(`${month}-01T12:00:00Z`);
  const offset = (first.getUTCDay() + 6) % 7;
  const count = new Date(
    Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0),
  ).getUTCDate();
  return Array.from({ length: 42 }, (_, index) => {
    const day = index - offset + 1;
    return day > 0 && day <= count ? `${month}-${String(day).padStart(2, '0')}` : '';
  });
}
/** Presenta una fecha sin que la zona del dispositivo la cambie al día anterior.
 * @param value Fecha ISO válida.
 * @returns Nombre completo del día en español.
 */
export function calendarLabel(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    timeZone: 'UTC',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00Z`));
}
