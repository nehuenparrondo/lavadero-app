import { useCallback } from 'react';
import type { Query } from '../api/services/resourceService';
import { readResource } from '../api/services/resourceService';
import { useQuery } from './useQuery';
/** Consulta un recurso sin conservar resultados de filtros anteriores.
 * @param path Recurso relativo de la API versionada.
 * @param query Filtros serializables.
 * @param enabled false cancela lógicamente la consulta y oculta resultados.
 * @returns data, loading, error y refresh correspondientes a los filtros actuales.
 */
export function useRemoteData<T>(path: string, query: Query = {}, enabled = true) {
  const filters = JSON.stringify(query);
  const load = useCallback(
    () => readResource<T>(path, JSON.parse(filters) as Query),
    [path, filters],
  );
  return useQuery(`${path}:${filters}`, enabled, load);
}
