import { useState, useEffect } from 'react';
import { useRemoteData } from './useRemoteData';
import type { Query } from '../api/services/resourceService';
import type { Page } from '../types/entities';
/** Lista paginada con filtro y navegación entre páginas para no truncar datos. */
export function usePagedList<T>(path: string, filters: Query = {}) {
  const [page, setPage] = useState(1);
  const key = JSON.stringify(filters);
  useEffect(() => {
    setPage(1);
  }, [key]);
  const state = useRemoteData<Page<T>>(path, { ...filters, page, limit: 20 });
  return { ...state, page, setPage };
}
