import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createQueryRequest } from '../utils/queryRequest';
import { currentQuery } from '../utils/queryState';
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
  const request = useMemo(
    () => createQueryRequest({ key, enabled, load, sequence, publish: setState }),
    [key, enabled, load],
  );
  const refresh = useCallback(() => request(), [request]);
  const revalidate = useCallback(() => request(true), [request]);
  useEffect(() => {
    void refresh();
    return () => {
      sequence.current++;
    };
  }, [refresh]);
  return { ...currentQuery(state, key, enabled), refresh, revalidate };
}
