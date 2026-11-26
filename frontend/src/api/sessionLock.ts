import { createSerialQueue } from '../utils/serialQueue';
const serial = createSerialQueue();
/** Serializa aceptación, cierre y rotación dentro de la instancia nativa.
 * @param operation Operación que lee/cambia la credencial persistente.
 * @returns Resultado propio; una falla no bloquea las acciones siguientes.
 */
export function runSessionExclusive<T>(operation: () => Promise<T>): Promise<T> {
  return serial(operation);
}
