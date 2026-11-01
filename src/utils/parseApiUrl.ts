/** Valida un origen público HTTPS, sin credenciales, rutas ni direcciones locales.
 * @param value - Valor tipado de value utilizado por esta operación.
 * @returns `string | null`, según el contrato de la operación.
 */
export function parseApiUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    const local = /^(localhost|127\.|0\.|\[::1\])/iu.test(url.hostname);
    if (url.username || url.password || url.pathname !== '/' || url.search || url.hash)
      return null;
    if (local) return null;
    return url.protocol === 'https:' ? url.origin : null;
  } catch {
    return null;
  }
}
