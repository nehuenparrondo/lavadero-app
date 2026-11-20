import { useEffect, useState } from 'react';
import type { Query } from '../api/services/resourceService';
import type { Page } from '../types/entities';
import { useRemoteData } from './useRemoteData';
/** Lista paginada con filtro y navegación entre páginas para no truncar datos.
 * @param path - Ruta relativa del recurso dentro de la API versionada.
 * @param filters - Filtros que restringen los datos solicitados.
 * @returns Recurso de consulta, página actual y setPage; los filtros reinician la página.
 */
export function usePagedList<T>(path: string, filters: Query = {}) {
  const [page, setPage] = useState(1);
  const key = JSON.stringify(filters);
  useEffect(() => {
    setPage(1);
  }, [key]);
  const state = useRemoteData<Page<T>>(path, { ...filters, page, limit: 20 });
  return { ...state, page, setPage };
}
