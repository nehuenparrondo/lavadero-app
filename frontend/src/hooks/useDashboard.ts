import type { Appointment, Page, Report } from '../types/entities';
import type { CustomerMessage } from '../types/operations';
import { useAuth } from './useAuth';
import { useRemoteData } from './useRemoteData';
/** Datos del tablero; refresca resumen y solicitudes como una sola acción de pantalla.
 * @returns Usuario, reporte diario, pendientes desde hoy, semanas del mes y recarga conjunta.
 */
export function useDashboard() {
  const { user } = useAuth();
  const report = useRemoteData<Report>('/reports', { period: 'day' });
  const week = useRemoteData<Report>('/reports', { period: 'month' });
  const complaints = useRemoteData<Page<CustomerMessage>>('/customer-messages', {
    state: 'open',
    limit: 1,
  });
  const pending = useRemoteData<Page<Appointment>>('/appointments', {
    queue: 'requested',
    limit: 5,
  });
  const refresh = async () => {
    await Promise.all([
      report.refresh(),
      pending.refresh(),
      week.refresh(),
      complaints.refresh(),
    ]);
  };
  const revalidate = async () => {
    await Promise.all([
      report.revalidate(),
      pending.revalidate(),
      week.revalidate(),
      complaints.revalidate(),
    ]);
  };
  return { user, report, pending, week, complaints, refresh, revalidate };
}
