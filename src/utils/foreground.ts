import { AppState } from 'react-native';
/** Indica si se puede actualizar sin actividad en segundo plano.
 * @returns true únicamente mientras la aplicación está activa.
 */
export function isForeground() {
  return AppState.currentState === 'active';
}
/** Escucha la vuelta al primer plano; el llamador controla la ruta enfocada.
 * @param refresh Callback de actualización, sin navegación ni cambios de formulario.
 * @returns Función que elimina la suscripción nativa.
 */
export function subscribeForeground(refresh: () => void) {
  const subscription = AppState.addEventListener('change', (state) => {
    if (state === 'active') refresh();
  });
  return () => subscription.remove();
}
