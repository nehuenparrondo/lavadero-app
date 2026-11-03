import type { Dispatch, SetStateAction } from 'react';
import { errorMessage } from './errorMessage';
import { readLatest } from './queryState';
import type { QueryState } from './queryState';
/** Construye una consulta con generaciones; solo conserva datos del mismo filtro en recarga silenciosa.
 * @param options Recurso, cargador, secuencia de montaje y publicación de estado.
 * @returns Operación que captura fallos y descarta resultados de peticiones anteriores.
 */
export function createQueryRequest<T>({
  key,
  enabled,
  load,
  sequence,
  publish,
}: {
  key: string;
  enabled: boolean;
  load: () => Promise<T>;
  sequence: { current: number };
  publish: Dispatch<SetStateAction<QueryState<T>>>;
}) {
  return async (quiet = false) => {
    if (!enabled) return;
    const id = ++sequence.current;
    const active = () => id === sequence.current;
    publish((previous) => ({
      key,
      data: quiet && previous.key === key ? previous.data : null,
      loading: true,
      error: '',
    }));
    try {
      await readLatest(load, active, (data) =>
        publish({ key, data, loading: false, error: '' }),
      );
    } catch (error) {
      if (active()) publish({ key, data: null, loading: false, error: errorMessage(error) });
    }
  };
}
