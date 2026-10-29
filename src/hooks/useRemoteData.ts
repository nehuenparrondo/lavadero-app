import { useCallback, useEffect, useRef, useState } from 'react';
import { readResource } from '../api/services/resourceService';
import type { Query } from '../api/services/resourceService';
import { errorMessage } from '../utils/errorMessage';
/** Consulta cancelable lógicamente con estados de carga/error, filtros y pull-to-refresh. */
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
