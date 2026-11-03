import type { Appointment } from '../types/entities';
import type { useAppointmentFiltersState } from './useAppointmentFiltersState';
import { usePagedList } from './usePagedList';
/** Traduce filtros visuales a la consulta; el servidor decide la visibilidad efectiva.
 * @param mode Rol de la vista que selecciona el tipo de historial.
 * @param filters Fecha, estado y opciones administrativas vigentes.
 * @returns Lista paginada que nunca mezcla resultados de fechas diferentes.
 */
export function useAgendaList(
  mode: 'client' | 'employee' | 'admin',
  filters: ReturnType<typeof useAppointmentFiltersState>,
) {
  const { history, date, status, clientId, employeeId } = filters;
  return usePagedList<Appointment>('/appointments', {
    history: mode === 'admin' ? undefined : String(history),
    date: /^\d{4}-\d{2}-\d{2}$/u.test(date) ? date : undefined,
    status: status || undefined,
    clientId: clientId || undefined,
    employeeId: employeeId || undefined,
  });
}
