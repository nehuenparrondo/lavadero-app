import { refreshResources, revalidateResources } from '../utils/refreshResources';
import { useAgendaResources } from './useAgendaResources';
import { useAppointmentFiltersState } from './useAppointmentFiltersState';
import { useAgendaList } from './useAgendaList';
/** Coordina filtros, página y opciones; el servidor aplica propiedad y asignaciones.
 * @param mode Experiencia que determina los filtros visibles, sin conceder permisos.
 * @param initialHistory Abre trabajos anteriores en lugar de próximos turnos.
 * @returns Lista paginada, filtros y opciones administrativas con recarga conjunta.
 */
export function useAppointments(
  mode: 'client' | 'employee' | 'admin',
  initialHistory = false,
) {
  const filters = useAppointmentFiltersState(mode, initialHistory);
  const list = useAgendaList(mode, filters);
  const { clients, employees } = useAgendaResources(mode);
  return {
    ...list,
    revalidate: () => revalidateResources(list, clients, employees),
    mode,
    ...filters,
    refresh: () => refreshResources(list, clients, employees),
    clients: clients.items,
    employees: employees.items,
    summaryError: clients.error || employees.error,
  };
}
