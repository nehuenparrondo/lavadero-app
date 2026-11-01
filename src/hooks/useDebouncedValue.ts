import { useEffect, useState } from 'react';

/** Evita una solicitud de búsqueda por cada tecla sin retrasar la escritura visible.
 * @param value - Entrada del formato declarado que se valida o transforma.
 * @param delay - Espera en milisegundos antes de publicar el valor estabilizado.
 * @returns Último valor que se mantuvo estable durante el intervalo pedido.
 */
export function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
