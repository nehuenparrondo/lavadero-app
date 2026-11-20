import type { Appointment, Page } from '../types/entities';
import { useAuth } from './useAuth';
import { useRemoteData } from './useRemoteData';
import { useCancellationNotices } from './useCancellationNotices';
import { useHomeClear } from './useHomeClear';
/** Próximas tres visitas propias, ordenadas cronológicamente.
 * @returns Usuario, recurso paginado y las próximas tres visitas ordenadas por inicio.
 */
export function useHome() {
  const { user } = useAuth();
  const notices = useCancellationNotices();
  const list = useRemoteData<Page<Appointment>>('/appointments', {
    history: 'false',
    home: 'true',
    limit: 100,
  });
  const upcoming = [...(list.data?.items ?? [])]
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, 3);
  const cleanup = useHomeClear(list.refresh);
  const refresh = async () => {
    await Promise.all([list.refresh(), notices.list.refresh()]);
  };
  const revalidate = async () => {
    await Promise.all([list.revalidate(), notices.list.revalidate()]);
  };
  return { user, list, upcoming, notices, cleanup, refresh, revalidate };
}
