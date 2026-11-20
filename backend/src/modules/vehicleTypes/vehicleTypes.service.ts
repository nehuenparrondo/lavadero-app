import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import { NotFoundError } from '../../errors/NotFoundError.js';
import type { Executor } from '../../utils/db.js';
import { transaction } from '../../utils/transaction.js';
import { supportsService } from '../services/catalogRules.js';
import { findService, savePrice } from '../services/services.repository.js';
import * as repo from './vehicleTypes.repository.js';
import type { vehicleTypeSchema } from './vehicleTypes.schema.js';

type VehicleTypeInput = z.infer<typeof vehicleTypeSchema>;
/** Catálogo con booleanos serializables.
 * @param admin - Habilita controles de gestión; el servidor conserva la autorización real.
 * @returns `Promise<{ isActive: boolean; constructor: { name: "RowDataPacket"; }; }[]>`.
 */
export async function listTypes(admin: boolean) {
  return (await repo.listTypes(admin)).map((v) => ({ ...v, isActive: Boolean(v.isActive) }));
}
/** Alta de tipo.
 * @param v - Datos tipados del elemento o formulario que se transforma.
 * @returns `Promise<{ code: string; name: string; isActive: boolean; id: string; }>`.
 */
export function createType({ prices, ...type }: VehicleTypeInput) {
  return transaction(async (connection) => {
    const id = await repo.insertType(type, connection);
    await saveTypePrices(id, type.code, prices, connection);
    return { id, ...type };
  });
}
/** Actualiza tipo y verifica existencia incluso si los valores no cambian.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param v - Datos tipados del elemento o formulario que se transforma.
 * @returns `Promise<{ code: string; name: string; isActive: boolean; id: string; }>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function editType(id: string, { prices, ...type }: VehicleTypeInput) {
  return transaction(async (connection) => {
    const current = await repo.findType(id, connection);
    if (!current) throw new NotFoundError();
    if (current.code === 'motorcycle' && type.code !== current.code)
      throw new AppError(400, 'TYPE_CODE_FIXED', 'El código de la categoría Moto es fijo.');
    await repo.updateType(id, type, connection);
    await saveTypePrices(id, type.code, prices, connection);
    return { id, ...type };
  });
}

/** Guarda el conjunto de tarifas o revierte la operación completa ante un renglón inválido. */
async function saveTypePrices(
  id: string,
  code: string,
  prices: VehicleTypeInput['prices'],
  connection: Executor,
) {
  for (const price of prices ?? []) {
    const service = await findService(price.serviceId, connection);
    if (!service || !supportsService(code, service.code))
      throw new AppError(
        400,
        'INVALID_SERVICE_TYPE',
        'Ese servicio no corresponde al tipo de vehículo.',
      );
    await savePrice(price.serviceId, id, price.priceCents, connection);
  }
}
/** Desactiva tipo.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns `Promise<{ deleted: boolean; }>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function deleteType(id: string) {
  if (!(await repo.listTypes(true)).some((t) => t.id === id)) throw new NotFoundError();
  await repo.deactivateType(id);
  return { deleted: true };
}
