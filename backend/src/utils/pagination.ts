import { z } from 'zod';

/** Paginación limitada y búsqueda opcional para listas administrativas. */
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  search: z.string().max(100).default(''),
});
/** Construye metadatos de una lista.
 * @param items - Renglones tipados que conservan precio, nombre y duración del contrato.
 * @param total - Cantidad total de registros, independiente del tamaño de página.
 * @param page - Número de página desde uno.
 * @param limit - Cantidad máxima de filas permitida por el esquema de paginación.
 * @returns `{ items: T[]; total: number; page: number; limit: number; }`.
 */
export function pageResult<T>(items: T[], total: number, page: number, limit: number) {
  return { items, total, page, limit };
}
