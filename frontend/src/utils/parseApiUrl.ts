/** Valida HTTPS; admite loopback HTTP únicamente cuando el modo de desarrollo lo pide.
 * @param value - Origen API configurado públicamente; no admite credenciales, rutas, query ni fragmento.
 * @param allowLocal - Solo desarrollo: conexión del navegador al backend de esta computadora.
 * @returns Origen normalizado permitido o NULL; HTTP loopback solo se acepta con allowLocal explícito.
 */
export function parseApiUrl(value: string | undefined, allowLocal = false): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    const local = /^(localhost|127\.|0\.|\[::1\])/iu.test(url.hostname);
    if (url.username || url.password || url.pathname !== '/' || url.search || url.hash)
      return null;
    if (local) {
      const loopback = /^(localhost|127\.0\.0\.1|\[::1\])$/iu.test(url.hostname);
      return allowLocal && loopback && ['http:', 'https:'].includes(url.protocol)
        ? url.origin
        : null;
    }
    return url.protocol === 'https:' ? url.origin : null;
  } catch {
    return null;
  }
}
