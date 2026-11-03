import { useAgendaResources } from './useAgendaResources';
import { useAppointmentFiltersState } from './useAppointmentFiltersState';
import { useAgendaList } from './useAgendaList';
/** Coordina filtros, página y resumen; el servidor aplica propiedad y asignaciones.
 * @param mode Experiencia que determina los filtros visibles, sin conceder permisos.
 * @param initialHistory Abre trabajos anteriores en lugar de próximos turnos.
 * @returns Lista paginada, filtros y resumen personal; refresh recarga ambos recursos.
 */
export function useAppointments(
  mode: 'client' | 'employee' | 'admin',
  initialHistory = false,
) {
  const filters = useAppointmentFiltersState(mode, initialHistory);
  const { history, date } = filters;
  const list = useAgendaList(mode, filters);
  const { summary, clients, employees } = useAgendaResources(mode, history, date);
  return {
    ...list,
    revalidate: async () => {
      await Promise.all([list.revalidate(), summary.revalidate()]);
    },
    mode,
    ...filters,
    refresh: async () => {
      await Promise.all([
        list.refresh(),
        summary.refresh(),
        clients.refresh(),
        employees.refresh(),
      ]);
    },
    clients: clients.items,
    employees: employees.items,
    summary: summary.error ? null : summary.data,
    summaryError: summary.error || clients.error || employees.error,
  };
}
