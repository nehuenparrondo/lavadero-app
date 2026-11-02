let connecting = false;
const listeners = new Set<() => void>();
/** Estado externo de la conexión inicial compartida.
 * @returns true mientras una acción espera al servidor.
 */
export function getConnecting() {
  return connecting;
}
/** Suscribe el aviso global sin iniciar tráfico de red.
 * @param listener Actualizador del consumidor.
 * @returns Función de desuscripción.
 */
export function subscribeConnection(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
/** Publica transiciones, sin exponer URLs ni errores internos.
 * @param value Estado de espera de la compuerta de disponibilidad.
 * @returns void.
 */
export function setConnecting(value: boolean) {
  connecting = value;
  listeners.forEach((listener) => listener());
}
