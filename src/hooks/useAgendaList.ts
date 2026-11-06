import type { Appointment } from '../types/entities';
import type { useAppointmentFiltersState } from './useAppointmentFiltersState';
import { usePagedList } from './usePagedList';
import { useDebouncedValue } from './useDebouncedValue';
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
  const plate = useDebouncedValue(filters.plate.replace(/[^a-z0-9]/giu, '').slice(0, 16));
  return usePagedList<Appointment>('/appointments', {
    history: mode === 'admin' || plate ? undefined : String(history),
    date: !plate && /^\d{4}-\d{2}-\d{2}$/u.test(date) ? date : undefined,
    plate: plate || undefined,
    status: status || undefined,
    clientId: clientId || undefined,
    employeeId: employeeId || undefined,
  });
}
