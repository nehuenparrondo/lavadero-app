import type { Query } from '../api/services/resourceService';
import { usePagedList } from './usePagedList';
import { useResourceEditor } from './useResourceEditor';
/** Une una colección paginada con el editor reutilizable; preserva error de lectura separado.
 * @param path - Ruta relativa del recurso dentro de la API versionada.
 * @param transform - Convierte valores del formulario al body de la API.
 * @param query - Filtros y paginación enviados como parámetros de consulta.
 * @param saveOperation - Guardado especializado que sustituye al estándar cuando el contrato lo requiere.
 * @returns Lista paginada, editor y fetchError separado del error de escritura.
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
