/** Título de la colección según rol e historial, sin reglas de acceso dentro del JSX.
 * @param mode - Valor tipado de mode utilizado por esta operación.
 * @param history - Valor tipado de history utilizado por esta operación.
 * @returns `"Historial de trabajos" | "Mi agenda" | "Turnos" | "Mis turnos"`, según el contrato de la operación.
 */
export function appointmentListTitle(mode: 'client' | 'employee' | 'admin', history: boolean) {
  if (mode === 'employee') return history ? 'Historial de trabajos' : 'Mi agenda';
  return mode === 'admin' ? 'Turnos' : 'Mis turnos';
}
