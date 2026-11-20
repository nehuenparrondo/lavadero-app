import type { Availability, Settings } from '../types/entities';
import { validDate } from './calendar';
import { today } from './format';
/** Explica por qué una fecha no puede ofrecer turnos antes de consultar un horario.
 * @param date Día elegido, sin hora.
 * @param settings Horarios públicos del negocio, si ya cargaron.
 * @returns Orientación breve para la selección de fecha.
 */
export function bookingDateMessage(date: string, settings: Settings | null) {
  if (!validDate(date)) return 'Elegí una fecha válida en el calendario.';
  if (date < today()) return 'Esta fecha ya pasó. Elegí hoy o un día posterior.';
  if (!settings) return '';
  const weekday = new Date(`${date}T12:00:00Z`).getUTCDay() || 7;
  const hours = settings.hours.find((h) => h.weekday === weekday);
  return hours
    ? `Atención de ${hours.opensAt.slice(0, 5)} a ${hours.closesAt.slice(0, 5)}.`
    : 'El lavadero no abre ese día. Elegí otra fecha en el calendario.';
}
/** Solo permite confirmar un horario de la cotización vigente y todavía futuro.
 * @param quote Cotización del filtro actual; null durante carga o error.
 * @param slot Inicio seleccionado, expresado en UTC.
 * @param loading Indica que aún se está verificando disponibilidad.
 * @param error Error de la última verificación.
 * @returns true cuando es seguro enviar la intención; el servidor vuelve a comprobarla.
 */
export function canBook(
  quote: Availability | null,
  slot: string,
  loading: boolean,
  error: string,
) {
  return (
    !loading && !error && Boolean(quote?.slots.includes(slot)) && Date.parse(slot) > Date.now()
  );
}
/** Mensaje específico para un día sin horarios; mantiene compatibilidad con servidores anteriores.
 * @param reason Motivo calculado por el servidor.
 * @returns Instrucción para elegir otra fecha o servicio.
 */
export function emptyAvailability(reason: Availability['unavailableReason']) {
  if (reason === 'closed') return 'El lavadero no abre ese día. Elegí otra fecha.';
  if (reason === 'past') return 'Ya terminó la atención para ese día. Elegí otra fecha.';
  if (reason === 'duration')
    return 'Los servicios elegidos no entran en el horario de atención. Elegí menos servicios u otro día.';
  return 'No quedan horarios disponibles para esta fecha. Probá otro día.';
}
