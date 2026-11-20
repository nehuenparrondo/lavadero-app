/** Dependencias inyectables: nunca reintenta reservas, pagos ni otras mutaciones. */
interface Dependencies {
  probe: () => Promise<boolean>;
  now: () => number;
  pause: () => Promise<void>;
  notify: (waiting: boolean) => void;
  budgetMs?: number;
  freshMs?: number;
}
/** Agrupa el despertar del servidor para evitar una solicitud por cada selector.
 * @param deps Reloj, espera y sondeo GET comprobables sin infraestructura.
 * @returns ensure, que espera una única conexión, y markReady para respuestas válidas.
 */
export function createReadinessGate(deps: Dependencies) {
  let freshUntil = 0;
  let pending: Promise<void> | null = null;
  const markReady = () => {
    freshUntil = deps.now() + (deps.freshMs ?? 120000);
  };
  const ensure = () => {
    if (deps.now() < freshUntil) return Promise.resolve();
    if (pending) return pending;
    deps.notify(true);
    pending = waitForReady(deps)
      .then(markReady)
      .finally(() => {
        pending = null;
        deps.notify(false);
      });
    return pending;
  };
  return { ensure, markReady };
}
/** Solo sondea GET /ready dentro de un plazo acotado; no mantiene vivo el servicio. */
async function waitForReady(deps: Dependencies) {
  const deadline = deps.now() + (deps.budgetMs ?? 90000);
  do {
    try {
      if (await deps.probe()) return;
    } catch {
      /* Red o arranque transitorio. */
    }
    if (deps.now() >= deadline) break;
    await deps.pause();
  } while (deps.now() < deadline);
  throw new Error('No pudimos conectar con el lavadero. Volvé a intentar en unos instantes.');
}
