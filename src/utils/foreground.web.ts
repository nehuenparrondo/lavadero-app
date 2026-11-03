/** Respeta pestañas ocultas; no mantiene despierto el servidor en segundo plano.
 * @returns true si el documento actual es visible.
 */
export function isForeground() {
  return typeof document !== 'undefined' && document.visibilityState === 'visible';
}
/** Atiende el regreso a la pestaña o ventana sin depender del cambio de ruta.
 * @param refresh Callback protegido frente a eventos repetidos.
 * @returns Limpieza de ambos listeners al abandonar la pantalla.
 */
export function subscribeForeground(refresh: () => void) {
  window.addEventListener('focus', refresh);
  document.addEventListener('visibilitychange', refresh);
  return () => {
    window.removeEventListener('focus', refresh);
    document.removeEventListener('visibilitychange', refresh);
  };
}
