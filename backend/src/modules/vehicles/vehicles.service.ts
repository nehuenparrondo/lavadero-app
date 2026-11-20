import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import { ConflictError } from '../../errors/ConflictError.js';
import { ForbiddenError } from '../../errors/ForbiddenError.js';
import { NotFoundError } from '../../errors/NotFoundError.js';
import type { Actor } from '../../types/domain.js';
import type { Executor } from '../../utils/db.js';
import { transaction } from '../../utils/transaction.js';
import { readSettings } from '../settings/settings.repository.js';
import { getProfile } from '../users/users.service.js';
import * as repository from './vehicles.repository.js';
import type { vehiclePatchSchema } from './vehicles.schema.js';
import { vehicleSchema } from './vehicles.schema.js';

/** Accede solo a un vehículo propio o administrado; oculta recursos ajenos.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<repository.Vehicle>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function getVehicle(current: Actor, id: string, executor?: Executor) {
  const v = await repository.findVehicle(id, executor);
  if (!v || v.deletedAt || (current.role !== 'admin' && v.ownerId !== current.id))
    throw new NotFoundError();
  return v;
}
/** Verifica propietario y tipo activo antes de guardar. */
async function validateOwner(current: Actor, ownerId: string, typeId: string) {
  if (current.role !== 'admin' && ownerId !== current.id) throw new ForbiddenError();
  const owner = await getProfile(ownerId);
  if (owner.role !== 'client' || !owner.isActive)
    throw new AppError(400, 'INVALID_OWNER', 'El titular debe ser un cliente activo.');
  if (!(await repository.isVehicleTypeActive(typeId)))
    throw new AppError(400, 'INVALID_VEHICLE_TYPE', 'Seleccioná un tipo de vehículo activo.');
}
/** Crea vehículo y asigna al cliente autenticado, salvo gestión administrativa.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<repository.Vehicle>`.
 */
export async function createVehicle(current: Actor, input: z.infer<typeof vehicleSchema>) {
  const ownerId = input.ownerId ?? current.id;
  await validateOwner(current, ownerId, input.vehicleTypeId);
  const id = await repository.insertVehicle({ ...input, ownerId });
  return getVehicle(current, id);
}
/** Edita los campos permitidos y valida el resultado completo.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<repository.Vehicle>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function editVehicle(
  current: Actor,
  id: string,
  input: z.infer<typeof vehiclePatchSchema>,
) {
  return transaction(async (connection) => {
    await readSettings(connection, true);
    const existing = await getVehicle(current, id, connection);
    const result = vehicleSchema.parse({
      plate: existing.plate,
      brand: existing.brand,
      model: existing.model,
      color: existing.color,
      vehicleTypeId: existing.vehicleTypeId,
      ownerId: existing.ownerId,
      ...input,
    });
    const ownerId = result.ownerId ?? existing.ownerId;
    if (ownerId !== existing.ownerId) {
      throw new ConflictError(
        'El titular de un vehículo no se transfiere. Creá otro registro para el nuevo titular.',
      );
    }
    await validateOwner(current, ownerId, result.vehicleTypeId);
    await repository.updateVehicle(id, { ...existing, ...result, ownerId }, connection);
    return getVehicle(current, id, connection);
  });
}
/** Rechaza baja de vehículos con trabajos aún pendientes.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns `Promise<{ deleted: boolean; }>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function deleteVehicle(current: Actor, id: string) {
  return transaction(async (connection) => {
    await readSettings(connection, true);
    await getVehicle(current, id, connection);
    if (!(await repository.removeVehicle(id, connection)))
      throw new ConflictError(
        'Cancelá o finalizá los turnos del vehículo antes de eliminarlo.',
      );
    return { deleted: true };
  });
}
