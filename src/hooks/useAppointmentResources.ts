import type { Appointment, Payment, Settings, User } from '../types/entities';
import { useOptions } from './useOptions';
import { useRemoteData } from './useRemoteData';
/** Consultas del detalle; los recursos administrativos no se solicitan para otros roles.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param user - Perfil vigente; nunca incluye una contraseña legible.
 * @param receiptOpen - Valor tipado de receiptOpen utilizado por esta operación.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useAppointmentResources(id: string, user: User | null, receiptOpen: boolean) {
  const detail = useRemoteData<Appointment>(`/appointments/${id}`, {}, Boolean(id));
  const settings = useRemoteData<Settings>('/business');
  const employees = useOptions<User>('/users', { role: 'employee' }, user?.role === 'admin');
  const payments = useRemoteData<Payment[]>(
    `/appointments/${id}/payments`,
    {},
    Boolean(id) && user?.role !== 'employee',
  );
  const receipt = useRemoteData<Appointment & { receiptNumber: string }>(
    `/appointments/${id}/receipt`,
    {},
    receiptOpen && user?.role !== 'employee',
  );
  return {
    detail,
    settings,
    employees: employees.items.filter((e) => e.isActive),
    payments,
    receipt,
  };
}
