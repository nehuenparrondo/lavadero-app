import type { QueryState } from './queryState';

/** Una consulta silenciosa no desmonta listas ni editores del mismo filtro.
 * @param previous Estado que sigue perteneciendo al consumidor.
 * @param key Identidad de la consulta actual.
 * @param quiet Si la carga ocurre automáticamente en segundo plano.
 * @returns Estado de carga con los datos válidos conservados.
 */
export function pendingQuery<T>(
  previous: QueryState<T>,
  key: string,
  quiet: boolean,
): QueryState<T> {
  const preserve = quiet && previous.key === key && previous.data !== null;
  return { key, data: preserve ? previous.data : null, loading: !preserve, error: '' };
}

/** Conserva un formulario visible ante un fallo transitorio, mostrando el error.
 * @param previous Estado del mismo recurso; nunca permite datos de otro filtro.
 * @param key Identidad de la consulta fallida.
 * @param quiet Indica recarga automática.
 * @param error Mensaje público y sin datos sensibles.
 * @returns Error visible junto con los últimos datos del filtro vigente.
 */
export function failedQuery<T>(
  previous: QueryState<T>,
  key: string,
  quiet: boolean,
  error: string,
): QueryState<T> {
  return { ...pendingQuery(previous, key, quiet), loading: false, error };
}
