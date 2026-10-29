import { apiClient } from '../client';
import type { Page } from '../../types/entities';
/** Parámetros de filtros de listas, nunca URLs arbitrarias de terceros. */
export type Query = Record<string, string | number | undefined>;
/** Lee una ruta versionada del contrato público. */
export async function readResource<T>(path: string, query: Query = {}) {
  return (await apiClient.get<{ data: T }>('/api/v1' + path, { params: query })).data.data;
}
/** Escribe una ruta versionada; componentes delegan a hooks que consumen este servicio. */
export async function writeResource<T>(
  method: 'post' | 'put' | 'patch' | 'delete',
  path: string,
  body: unknown = {},
) {
  return (await apiClient.request<{ data: T }>({ method, url: '/api/v1' + path, data: body }))
    .data.data;
}
/** Carga opciones de formularios paginadas sin truncar a los primeros cien registros. */
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
