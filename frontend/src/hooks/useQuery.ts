import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createQueryRequest } from '../utils/queryRequest';
import { currentQuery } from '../utils/queryState';
import type { QueryState } from '../utils/queryState';
/** Mantiene datos de un recurso sin publicar respuestas de filtros anteriores o vistas desmontadas.
 * @param key Identidad estable del recurso y filtros; cambiarla descarta la proyección anterior.
 * @param enabled Impide consultas cuando faltan datos mínimos, como fecha o categoría de reserva.
 * @param load Función estable de lectura; el transporte controla errores y renovación de sesión.
 * @returns Estado vigente, refresh para carga explícita y revalidate para consulta silenciosa del mismo filtro.
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
