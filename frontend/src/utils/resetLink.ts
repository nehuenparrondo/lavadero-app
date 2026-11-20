/** Lee un token exclusivamente del fragmento; nunca de la consulta enviada a servidores.
 * @param url - Enlace HTTPS abierto por la persona.
 * @returns Token válido o cadena vacía.
 */
export function parseResetLink(url: string) {
  try {
    const value = new URLSearchParams(new URL(url).hash.slice(1)).get('token') ?? '';
    return /^[a-f0-9]{64}$/u.test(value) ? value : '';
  } catch {
    return '';
  }
}
