import type { Appointment, User } from '../types/entities';
import { today } from '../utils/format';
import { useAppointmentFiltersState } from './useAppointmentFiltersState';
import { useOptions } from './useOptions';
import { usePagedList } from './usePagedList';
import { useRemoteData } from './useRemoteData';
/** Agenda filtrada según experiencia, sin ampliar los permisos aplicados por backend.
 * @param mode - Valor tipado de mode utilizado por esta operación.
 * @param initialHistory - Valor tipado de initialHistory utilizado por esta operación.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
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
  const summary = useRemoteData<{ completed: number; pending: number }>(
    '/reports/me',
    { date: date || today() },
    mode === 'employee' && !history,
  );
  const clients = useOptions<User>('/users', { role: 'client' }, mode === 'admin');
  const employees = useOptions<User>('/users', { role: 'employee' }, mode === 'admin');
  return {
    ...list,
    mode,
    ...filters,
    clients: clients.items,
    employees: employees.items,
    summary: summary.data,
  };
}
