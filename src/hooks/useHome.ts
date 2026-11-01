import type { Appointment, Page } from '../types/entities';
import { useAuth } from './useAuth';
import { useRemoteData } from './useRemoteData';
/** Próximas tres visitas propias, ordenadas cronológicamente.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useHome() {
  const { user } = useAuth();
  const list = useRemoteData<Page<Appointment>>('/appointments', {
    history: 'false',
    limit: 100,
  });
  const upcoming = [...(list.data?.items ?? [])]
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, 3);
  return { user, list, upcoming };
}
