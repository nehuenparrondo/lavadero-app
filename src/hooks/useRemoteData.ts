import { useCallback, useEffect, useRef, useState } from 'react';
import type { Query } from '../api/services/resourceService';
import { readResource } from '../api/services/resourceService';
import { errorMessage } from '../utils/errorMessage';
/** Consulta un recurso y descarta respuestas de filtros anteriores o de un consumidor desmontado.
 * @param path Recurso relativo dentro de la API versionada.
 * @param query Filtros serializables; su cambio inicia otra consulta.
 * @param enabled false evita la petición mientras la selección está incompleta.
 * @returns data, loading, error y refresh; conserva datos previos durante una actualización.
 * @remarks sequence evita publicar resultados obsoletos; no aborta la petición HTTP ya enviada.
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
