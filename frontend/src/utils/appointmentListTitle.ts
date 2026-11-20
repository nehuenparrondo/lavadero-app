/** Título de la colección según rol e historial, sin reglas de acceso dentro del JSX.
 * @param mode - Experiencia o preferencia seleccionada dentro de su unión de tipos.
 * @param history - Selecciona trabajos anteriores en lugar de próximas visitas.
 * @returns `"Historial de trabajos" | "Mi agenda" | "Turnos" | "Mis turnos"`.
 */
export function appointmentListTitle(mode: 'client' | 'employee' | 'admin', history: boolean) {
  if (mode === 'employee') return history ? 'Historial de trabajos' : 'Mi agenda';
  return mode === 'admin' ? 'Turnos' : 'Mis turnos';
}
