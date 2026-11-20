import { useCallback } from 'react';
import type { Query } from '../api/services/resourceService';
import { readOptions } from '../api/services/resourceService';
import { useQuery } from './useQuery';
/** Carga todas las páginas de un selector y permite actualizarlo al volver a la pantalla.
 * @param path Recurso paginado de la API.
 * @param query Filtros serializables.
 * @param enabled false evita solicitar opciones ajenas al rol.
 * @returns Opciones actuales, loading, error y refresh.
 */
export function useOptions<T>(path: string, query: Query = {}, enabled = true) {
  const filters = JSON.stringify(query);
  const load = useCallback(
    () => readOptions<T>(path, JSON.parse(filters) as Query),
    [path, filters],
  );
  const result = useQuery(`${path}:${filters}`, enabled, load);
  return { ...result, items: result.data ?? [] };
}
