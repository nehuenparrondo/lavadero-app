import type { Query } from '../api/services/resourceService';
import { usePagedList } from './usePagedList';
import { useResourceEditor } from './useResourceEditor';
/** Une una colección paginada con el editor reutilizable; preserva error de lectura separado.
 * @param path - Ruta relativa del recurso dentro de la API versionada.
 * @param transform - Valor tipado de transform utilizado por esta operación.
 * @param query - Filtros y paginación enviados como parámetros de consulta.
 * @param saveOperation - Valor tipado de saveOperation utilizado por esta operación.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useEntityManager<T extends { id: string }>(
  path: string,
  transform: (v: Record<string, string>) => unknown,
  query: Query = {},
  saveOperation?: (current: T | null, body: unknown) => Promise<unknown>,
) {
  const list = usePagedList<T>(path, query);
  const editor = useResourceEditor<T>(path, transform, list.refresh, saveOperation);
  return { ...list, ...editor, fetchError: list.error };
}
