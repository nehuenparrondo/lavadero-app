import { recoveryConfigured } from '../../config/recovery.js';
import { dispatchRecovery } from './recovery.delivery.js';
let running = false;
/** Trabajador duradero: el cierre del proceso deja el trabajo disponible tras vencer el bloqueo.
 * @returns Temporizador cancelable, o undefined si no se configuró Mailtrap.
 */
export function startRecoveryWorker() {
  if (!recoveryConfigured()) return undefined;
  const tick = async () => {
    if (running) return;
    running = true;
    try {
      await dispatchRecovery();
    } catch {
      console.error('RECOVERY_WORKER_UNAVAILABLE');
    } finally {
      running = false;
    }
  };
  void tick();
  return setInterval(() => {
    void tick();
  }, 5000).unref();
}
