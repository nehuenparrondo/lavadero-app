import type { Request } from 'express';
import type { z } from 'zod';
import { actor, paramId } from '../../utils/http.js';
import type { priceSchema, servicePatchSchema, serviceSchema } from './services.schema.js';
import * as s from './services.service.js';
/** Catálogo según rol.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }[]>`.
 */
export function list(r: Request) {
  return s.catalog(actor(r).role === 'admin');
}
/** Consulta individual de servicio y tarifas.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.
 */
export function get(r: Request) {
  return s.getService(paramId(r), actor(r).role === 'admin');
}
/** Alta de servicio.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.
 */
export function create(r: Request) {
  return s.createService(r.body as z.infer<typeof serviceSchema>);
}
/** Edición administrativa.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.
 */
export function edit(r: Request) {
  return s.editService(paramId(r), r.body as z.infer<typeof servicePatchSchema>);
}
/** Baja lógica.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ deleted: boolean; }>`.
 */
export function remove(r: Request) {
  return s.deleteService(paramId(r));
}
/** Tarifa por tipo.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ updated: boolean; }>`.
 */
export function price(r: Request) {
  return s.setPrice(
    paramId(r),
    paramId(r, 'typeId'),
    (r.body as z.infer<typeof priceSchema>).priceCents,
  );
}
