import type { Page } from '../../types/entities';
import { apiClient } from '../client';
/** Parámetros de filtros de listas, nunca URLs arbitrarias de terceros. */
export type Query = Record<string, string | number | undefined>;
/** Lee una ruta versionada del contrato público.
 * @param path - Ruta relativa del recurso dentro de la API versionada.
 * @param query - Filtros y paginación enviados como parámetros de consulta.
 * @returns `Promise<T>`.
 */
export async function readResource<T>(path: string, query: Query = {}) {
  return (await apiClient.get<{ data: T }>('/api/v1' + path, { params: query })).data.data;
}
/** Escribe una ruta versionada; componentes delegan a hooks que consumen este servicio.
 * @param method - Verbo HTTP permitido para la escritura.
 * @param path - Ruta relativa del recurso dentro de la API versionada.
 * @param body - Carga validada de la operación de escritura.
 * @returns `Promise<T>`.
 */
export async function writeResource<T>(
  method: 'post' | 'put' | 'patch' | 'delete',
  path: string,
  body: unknown = {},
) {
  return (await apiClient.request<{ data: T }>({ method, url: '/api/v1' + path, data: body }))
    .data.data;
}
/** Carga opciones de formularios paginadas sin truncar a los primeros cien registros.
 * @param path - Ruta relativa del recurso dentro de la API versionada.
 * @param query - Filtros y paginación enviados como parámetros de consulta.
 * @returns `Promise<T[]>`.
 */
export async function readOptions<T>(path: string, query: Query = {}) {
  const all: T[] = [];
  let page = 1;
  while (true) {
    const result = await readResource<Page<T>>(path, { ...query, page, limit: 100 });
    all.push(...result.items);
    if (all.length >= result.total || !result.items.length) return all;
    page++;
  }
}
