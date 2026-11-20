import { AppError } from '../../errors/AppError.js';
/** Consulta HTTP al proveedor con timeout; solo acepta respuesta JSON exitosa.
 * @param url - Dirección que debe superar la validación del consumidor antes de utilizarse.
 * @param init - Inicializador del estado local del editor.
 * @returns `Promise<Record<string, unknown>>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function fetchJson(url: string, init: RequestInit) {
  const response = await fetch(url, { ...init, signal: AbortSignal.timeout(15000) });
  if (!response.ok)
    throw new AppError(
      401,
      'OAUTH_PROVIDER_ERROR',
      'El proveedor no pudo completar el acceso.',
    );
  return (await response.json()) as Record<string, unknown>;
}
