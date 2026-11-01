import { useEffect, useState } from 'react';

/** Evita una solicitud de búsqueda por cada tecla sin retrasar la escritura visible.
 * @param value - Valor tipado de value utilizado por esta operación.
 * @param delay - Valor tipado de delay utilizado por esta operación.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
