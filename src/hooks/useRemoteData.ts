import { useCallback, useEffect, useRef, useState } from 'react';
import type { Query } from '../api/services/resourceService';
import { readResource } from '../api/services/resourceService';
import { errorMessage } from '../utils/errorMessage';
/** Consulta cancelable lógicamente con estados de carga/error, filtros y pull-to-refresh.
 * @param path - Ruta relativa del recurso dentro de la API versionada.
 * @param query - Filtros y paginación enviados como parámetros de consulta.
 * @param enabled - Valor tipado de enabled utilizado por esta operación.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useRemoteData<T>(path: string, query: Query = {}, enabled = true) {
  const key = JSON.stringify(query);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const sequence = useRef(0);
  const refresh = useCallback(async () => {
    if (!enabled) return;
    const id = ++sequence.current;
    setLoading(true);
    setError('');
    try {
      const result = await readResource<T>(path, JSON.parse(key) as Query);
      if (id === sequence.current) setData(result);
    } catch (e) {
      if (id === sequence.current) setError(errorMessage(e));
    } finally {
      if (id === sequence.current) setLoading(false);
    }
  }, [path, key, enabled]);
  useEffect(() => {
    void refresh();
    return () => {
      sequence.current++;
    };
  }, [refresh]);
  return { data, loading, error, refresh };
}
