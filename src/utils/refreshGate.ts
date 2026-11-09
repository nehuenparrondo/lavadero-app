/** Diferencia el regreso a la vista del sondeo durante su uso. */
export type RefreshTrigger = 'resume' | 'interval';

/** Evita recargas solapadas y conserva el regreso a la vista durante un sondeo.
 * @param refresh Recarga que publica su propio estado de red.
 * @param enabled Consulta si sigue visible y libre para actualizar.
 * @param now Reloj inyectable para verificar ráfagas de eventos.
 * @returns Disparador que serializa la recarga y agrupa señales repetidas por origen.
 */
export function createRefreshGate(
  refresh: (trigger: RefreshTrigger) => void | Promise<void>,
  enabled: () => boolean,
  now = Date.now,
) {
  const last: Partial<Record<RefreshTrigger, number>> = {};
  let running: { trigger: RefreshTrigger; work: Promise<void> } | undefined;
  return async (trigger: RefreshTrigger = 'resume') => {
    const canRefresh = () => enabled() && now() - (last[trigger] ?? -Infinity) >= 1000;
    if (!canRefresh()) return;
    if (running) {
      if (trigger === 'interval' || running.trigger === 'resume') return;
      await running.work.catch(() => undefined);
      if (running || !canRefresh()) return;
    }
    last[trigger] = now();
    const work = (async () => refresh(trigger))();
    running = { trigger, work };
    try {
      await work;
    } finally {
      running = undefined;
    }
  };
}
