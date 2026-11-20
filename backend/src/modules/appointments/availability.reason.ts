/** Explica un resultado vacío sin confundir un día cerrado con un cupo ocupado.
 * @param window Horario UTC del día; null si el negocio no abre.
 * @param durationMinutes Duración total de los servicios seleccionados.
 * @param slots Inicios válidos calculados con capacidad y fecha actuales.
 * @param now Reloj inyectable para probar bordes sin depender del horario del test.
 * @returns Motivo público de indisponibilidad o null si hay opciones.
 */
export function unavailableReason(
  window: { open: number; close: number } | null,
  durationMinutes: number,
  slots: string[],
  now = Date.now(),
) {
  if (slots.length) return null;
  if (!window) return 'closed';
  if (window.close <= now) return 'past';
  if (durationMinutes * 60000 > window.close - window.open) return 'duration';
  if (window.close <= now + durationMinutes * 60000) return 'past';
  return 'full';
}
