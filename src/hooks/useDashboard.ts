import type { Appointment, Page, Report } from '../types/entities';
import { useAuth } from './useAuth';
import { useRemoteData } from './useRemoteData';
/** Datos del tablero; refresca resumen y solicitudes como una sola acción de pantalla.
 * @returns Usuario, reporte diario, pendientes globales, reporte semanal y recarga conjunta.
 */
export function useDashboard() {
  const { user } = useAuth();
  const report = useRemoteData<Report>('/reports', { period: 'day' });
  const week = useRemoteData<Report>('/reports', { period: 'week' });
  const pending = useRemoteData<Page<Appointment>>('/appointments', {
    history: 'false',
    limit: 3,
  });
  const refresh = async () => {
    await Promise.all([report.refresh(), pending.refresh(), week.refresh()]);
  };
  const revalidate = async () => {
    await Promise.all([report.revalidate(), pending.revalidate(), week.revalidate()]);
  };
  return { user, report, pending, week, refresh, revalidate };
}
