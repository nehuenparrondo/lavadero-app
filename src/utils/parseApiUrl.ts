/** Valida un origen público HTTPS.
 * @param value Variable pública de entorno.
 * @returns Origen normalizado o null si falta/es inválido; no lanza errores.
 */
export function parseApiUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    const local = /^(localhost|127\.|0\.|\[::1\])/iu.test(url.hostname);
    if (url.protocol !== 'https:' || local || url.username || url.password) return null;
    if (url.pathname !== '/' || url.search || url.hash) return null;
    return url.origin;
  } catch {
    return null;
  }
}
