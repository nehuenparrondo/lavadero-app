import type { Request } from 'express';
import { z } from 'zod';
import { actor, paramId } from '../../utils/http.js';
import { vehicleQuerySchema } from './vehicles.schema.js';
import type { vehiclePatchSchema, vehicleSchema } from './vehicles.schema.js';
import * as service from './vehicles.service.js';

/** Lista visibles para el actor, con búsqueda/paginación.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ items: import("./vehicles.repository.js").Vehicle[]; page: number; limit: number; total: number; }>`.
 */
export function list(r: Request) {
  return service.listVehicles(actor(r), vehicleQuerySchema.parse(r.query));
}
/** Consulta por ID con propiedad validada.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<import("./vehicles.repository.js").Vehicle>`.
 */
export function get(r: Request) {
  return service.getVehicle(actor(r), paramId(r));
}
/** Crea vehículo.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<import("./vehicles.repository.js").Vehicle>`.
 */
export function create(r: Request) {
  return service.createVehicle(actor(r), r.body as z.infer<typeof vehicleSchema>);
}
/** Edita vehículo.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<import("./vehicles.repository.js").Vehicle>`.
 */
export function edit(r: Request) {
  return service.editVehicle(
    actor(r),
    paramId(r),
    r.body as z.infer<typeof vehiclePatchSchema>,
  );
}
/** Elimina vehículo lógicamente.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ deleted: boolean; }>`.
 */
export function remove(r: Request) {
  return service.deleteVehicle(actor(r), paramId(r));
}
