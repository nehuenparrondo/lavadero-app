import type { Appointment, Page, Report } from '../types/entities';
import { useAuth } from './useAuth';
import { useRemoteData } from './useRemoteData';
/** Datos del tablero; refresca resumen y solicitudes como una sola acción de pantalla.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useDashboard() {
  const { user } = useAuth();
  const report = useRemoteData<Report>('/reports', { period: 'day' });
  const pending = useRemoteData<Page<Appointment>>('/appointments', {
    status: 'pending',
    limit: 3,
  });
  const refresh = async () => {
    await Promise.all([report.refresh(), pending.refresh()]);
  };
  return { user, report, pending, refresh };
}
