import { useCallback, useEffect, useRef, useState } from 'react';
import { errorMessage } from '../utils/errorMessage';
import { currentQuery, readLatest } from '../utils/queryState';
import type { QueryState } from '../utils/queryState';
/** Coordina carga, recarga y respuestas fuera de orden sin mostrar datos de otra selección.
 * @param key Identidad estable del recurso y sus filtros.
 * @param enabled Evita peticiones y resultados cuando faltan prerrequisitos.
 * @param load Función estable que consulta el recurso.
 * @returns Resultado vigente y refresh, seguro después del desmontaje.
 */
export function useQuery<T>(key: string, enabled: boolean, load: () => Promise<T>) {
  const [state, setState] = useState<QueryState<T>>({
    key: '',
    data: null,
    loading: false,
    error: '',
  });
  const sequence = useRef(0);
  const refresh = useCallback(async () => {
    if (!enabled) return;
    const id = ++sequence.current;
    const active = () => id === sequence.current;
    setState({ key, data: null, loading: true, error: '' });
    try {
      await readLatest(load, active, (data) =>
        setState({ key, data, loading: false, error: '' }),
      );
    } catch (error) {
      if (active()) setState({ key, data: null, loading: false, error: errorMessage(error) });
    }
  }, [enabled, key, load]);
  useEffect(() => {
    void refresh();
    return () => {
      sequence.current++;
    };
  }, [refresh]);
  return { ...currentQuery(state, key, enabled), refresh };
}
