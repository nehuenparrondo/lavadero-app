import { useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';
import { isForeground, subscribeForeground } from '../utils/foreground';
import { createRefreshGate } from '../utils/refreshGate';
/** Actualiza al regresar a la ruta/app y, opcionalmente, mientras se usa una agenda.
 * @param refresh Recarga vigente; las vistas estáticas no instalan listeners.
 * @param busy Evita solapar la carga o mutación de la pantalla.
 * @param interval Milisegundos entre consultas visibles; cero deshabilita el sondeo.
 * @param revalidate Recarga silenciosa opcional que conserva la lista del mismo filtro.
 * @returns void; elimina listeners/timer al salir y nunca consulta con la app oculta.
 */
export function useRefreshOnReturn(
  refresh?: () => void | Promise<void>,
  busy = false,
  interval = 0,
  revalidate?: () => void | Promise<void>,
) {
  const current = useRef({ refresh, revalidate, busy });
  current.current = { refresh, revalidate, busy };
  const visited = useRef(false);
  const enabled = Boolean(refresh);
  useFocusEffect(
    useCallback(() => {
      if (!enabled) return;
      let active = true;
      const update = createRefreshGate(
        () => (current.current.revalidate ?? current.current.refresh)?.(),
        () => active && !current.current.busy && isForeground(),
      );
      const run = () => {
        void update().catch(() => undefined);
      };
      if (visited.current) run();
      visited.current = true;
      const unsubscribe = subscribeForeground(run);
      const timer = interval > 0 ? setInterval(run, interval) : undefined;
      return () => {
        active = false;
        unsubscribe();
        if (timer) clearInterval(timer);
      };
    }, [enabled, interval]),
  );
}
