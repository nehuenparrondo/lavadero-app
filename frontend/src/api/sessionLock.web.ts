import { createSerialQueue } from '../utils/serialQueue';
const serial = createSerialQueue();
/** Serializa rotaciones entre pestañas mediante Web Locks, liberados también ante fallos.
 * @param operation Operación de credenciales dentro del bloqueo del origen.
 * @returns Resultado exclusivo; sin Web Locks conserva la cola de la pestaña.
 */
export function runSessionExclusive<T>(operation: () => Promise<T>): Promise<T> {
  if (typeof navigator === 'undefined' || !navigator.locks) return serial(operation);
  return navigator.locks.request(
    'lavadero.session',
    { signal: AbortSignal.timeout(180000) },
    operation,
  );
}
