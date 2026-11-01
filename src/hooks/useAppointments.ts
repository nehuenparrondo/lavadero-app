import type { Appointment } from '../types/entities';
import { useAgendaResources } from './useAgendaResources';
import { useAppointmentFiltersState } from './useAppointmentFiltersState';
import { usePagedList } from './usePagedList';
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
  const { history, date, status, clientId, employeeId } = filters;
  const list = usePagedList<Appointment>('/appointments', {
    history: mode === 'admin' ? undefined : String(history),
    date: /^\d{4}-\d{2}-\d{2}$/u.test(date) ? date : undefined,
    status: status || undefined,
    clientId: clientId || undefined,
    employeeId: employeeId || undefined,
  });
  const { summary, clients, employees } = useAgendaResources(mode, history, date);
  return {
    ...list,
    mode,
    ...filters,
    refresh: async () => {
      await Promise.all([list.refresh(), summary.refresh()]);
    },
    clients: clients.items,
    employees: employees.items,
    summary: summary.error || summary.loading ? null : summary.data,
    summaryError: summary.error,
  };
}
