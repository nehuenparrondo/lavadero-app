/** MariaDB entrega strings UTC sin sufijo; nunca se interpretan en la zona local del servidor.
 * @param timestamp - DATETIME de sesión UTC.
 * @returns Verdadero ante una fecha inválida o vencida.
 */
export function recoveryExpired(timestamp: string) {
  const value = Date.parse(timestamp.replace(' ', 'T') + 'Z');
  return !Number.isFinite(value) || value <= Date.now();
}
