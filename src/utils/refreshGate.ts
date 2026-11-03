/** Evita recargas solapadas y eventos duplicados de foco/visibilidad.
 * @param refresh Recarga que publica su propio estado de red.
 * @param enabled Consulta si sigue visible y libre para actualizar.
 * @param now Reloj inyectable para verificar ráfagas de eventos.
 * @returns Disparador seguro; ignora nuevas señales mientras sigue pendiente.
 */
export function createRefreshGate(
  refresh: () => void | Promise<void>,
  enabled: () => boolean,
  now = Date.now,
) {
  let running = false;
  let last = -Infinity;
  return async () => {
    if (running || !enabled() || now() - last < 1000) return;
    running = true;
    last = now();
    try {
      await refresh();
    } finally {
      running = false;
    }
  };
}
