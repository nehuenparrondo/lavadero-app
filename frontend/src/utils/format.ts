/** Presenta centavos como pesos argentinos sin alterar el valor persistido.
 * @param cents - Importe entero en centavos ARS.
 * @returns `string`.
 */
export function money(cents: number | undefined) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format((cents ?? 0) / 100);
}
/** Fecha legible en la zona horaria operativa confirmada.
 * @param value - Instante ISO UTC de la API que se presenta en la zona del negocio.
 * @returns Fecha y hora legibles para el usuario; no se reutiliza para guardar otro instante.
 */
export function appointmentDate(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}
/** Día ISO local de Argentina para filtros de jornada.
 * @returns `string`.
 */
export function today() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  return `${parts.find((p) => p.type === 'year')!.value}-${parts.find((p) => p.type === 'month')!.value}-${parts.find((p) => p.type === 'day')!.value}`;
}
/** Hora local de una opción UTC, enviada por el servidor.
 * @param value - Inicio ISO UTC de una opción de disponibilidad.
 * @returns Hora y minutos locales para mostrar en la rueda de horarios.
 */
export function slotTime(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(value));
}
