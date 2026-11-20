import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import { NotFoundError } from '../../errors/NotFoundError.js';
import { findType } from '../vehicleTypes/vehicleTypes.repository.js';
import { supportsService } from './catalogRules.js';
import * as repo from './services.repository.js';
import type { servicePatchSchema } from './services.schema.js';
import { serviceSchema } from './services.schema.js';
/** Retorna catálogo con tarifas por tipo y duración estimada.
 * @param admin - Habilita controles de gestión; el servidor conserva la autorización real.
 * @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }[]>`.
 */
export async function catalog(admin: boolean) {
  const [services, prices] = await Promise.all([repo.listServices(admin), repo.listPrices()]);
  return services.map((s) => ({
    ...s,
    isActive: Boolean(s.isActive),
    prices: prices.filter((p) => p.serviceId === s.id),
  }));
}
/** Crea servicio, aún sin tarifas hasta que admin las cargue.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.
 */
export async function createService(input: z.infer<typeof serviceSchema>) {
  return getService(await repo.insertService(input), true);
}
/** Edita y valida un servicio existente.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function editService(id: string, input: z.infer<typeof servicePatchSchema>) {
  const current = await repo.findService(id);
  if (!current) throw new NotFoundError();
  if (
    input.code &&
    input.code !== current.code &&
    ['interior', 'exterior', 'complete', 'wax', 'upholstery', 'motorcycle_wash'].includes(
      current.code,
    )
  )
    throw new AppError(
      400,
      'SERVICE_CODE_FIXED',
      'El código de un servicio base o extra es fijo.',
    );
  const data = serviceSchema.parse({
    code: current.code,
    name: current.name,
    description: current.description,
    durationMinutes: current.durationMinutes,
    isActive: Boolean(current.isActive),
    ...input,
  });
  await repo.updateService(id, data);
  return getService(id, true);
}
/** Desactiva servicio existente sin afectar precios históricos.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns `Promise<{ deleted: boolean; }>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function deleteService(id: string) {
  if (!(await repo.findService(id))) throw new NotFoundError();
  await repo.removeService(id);
  return { deleted: true };
}
/** Cambia tarifa vigente. FK impide un tipo inexistente.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param typeId - Tipo de vehículo para resolver su tarifa vigente.
 * @param cents - Importe entero en centavos ARS.
 * @returns `Promise<{ updated: boolean; }>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function setPrice(id: string, typeId: string, cents: number) {
  const [service, type] = await Promise.all([repo.findService(id), findType(typeId)]);
  if (!service || !type) throw new NotFoundError();
  if (!supportsService(type.code, service.code))
    throw new AppError(
      400,
      'INVALID_SERVICE_TYPE',
      'Ese servicio no corresponde al tipo de vehículo.',
    );
  await repo.savePrice(id, typeId, cents);
  return { updated: true };
}
/** Detalle de catálogo con la misma proyección normalizada que la lista.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param admin - Habilita controles de gestión; el servidor conserva la autorización real.
 * @returns `Promise<{ isActive: boolean; prices: import("mysql2").RowDataPacket[]; id: string; code: string; name: string; description: string; durationMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function getService(id: string, admin: boolean) {
  const service = await repo.findService(id);
  if (!service || (!admin && !service.isActive)) throw new NotFoundError();
  return {
    ...service,
    isActive: Boolean(service.isActive),
    prices: (await repo.listPrices()).filter((price) => price.serviceId === id),
  };
}
