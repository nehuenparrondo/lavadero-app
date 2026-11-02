import { useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';
/** Recarga al regresar de otra ruta sin duplicar la carga inicial ni cada cambio de filtro.
 * @param refresh Operación actual de la pantalla; puede faltar en vistas estáticas.
 * @returns void.
 */
export function useRefreshOnReturn(refresh?: () => void) {
  const current = useRef(refresh);
  current.current = refresh;
  const visited = useRef(false);
  useFocusEffect(
    useCallback(() => {
      if (visited.current) current.current?.();
      visited.current = true;
    }, []),
  );
}
