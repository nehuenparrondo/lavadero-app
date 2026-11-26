let revision = 0;
/** Lee la generación de identidad, distinta de la rotación del token de la misma cuenta.
 * @returns Generación que permite descartar respuestas de una cuenta que se cerró/cambió.
 */
export function sessionRevision() {
  return revision;
}
/** Invalida operaciones anteriores antes de aceptar/cerrar explícitamente una cuenta.
 * @returns Nueva generación que debe seguir vigente antes de publicar una respuesta asíncrona.
 */
export function changeSessionRevision() {
  return ++revision;
}
