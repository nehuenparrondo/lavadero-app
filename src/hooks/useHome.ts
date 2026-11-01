import type { Appointment, Page } from '../types/entities';
import { useAuth } from './useAuth';
import { useRemoteData } from './useRemoteData';
/** Próximas tres visitas propias, ordenadas cronológicamente.
 * @returns Usuario, recurso paginado y las próximas tres visitas ordenadas por inicio.
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
