import { AppError } from '../../errors/AppError.js';
import { NotFoundError } from '../../errors/NotFoundError.js';
import type { Actor } from '../../types/domain.js';
import type { Executor } from '../../utils/db.js';
import { assertWashSelection, supportsService } from '../services/catalogRules.js';
import { findType } from '../vehicleTypes/vehicleTypes.repository.js';
import { findVehicle } from '../vehicles/vehicles.repository.js';
import { quoteServices } from './appointments.repository.js';

type QuoteTarget = {
  vehicleId?: string | undefined;
  vehicleTypeId?: string | undefined;
  serviceIds: string[];
};

/** Cotiza desde el tipo seleccionado o desde un vehículo ya registrado.
 * @param actor Actor que puede usar solo sus vehículos salvo una reserva asistida.
 * @param target Referencia exclusiva de vehículo o tipo, más servicios solicitados.
 * @param executor Conexión de reserva para leer el catálogo dentro de la transacción.
 * @returns Renglones y totales calculados, categoría reservada y vehículo opcional.
 */
export async function quote(actor: Actor, target: QuoteTarget, executor?: Executor) {
  const vehicle = target.vehicleId
    ? await ownedVehicle(actor, target.vehicleId, executor)
    : undefined;
  const typeId = vehicle?.vehicleTypeId ?? target.vehicleTypeId!;
  const type = await findType(typeId, executor);
  if (!type?.isActive)
    throw new AppError(400, 'INVALID_VEHICLE_TYPE', 'Seleccioná un tipo de vehículo activo.');
  const items = await quoteServices(target.serviceIds, typeId, executor);
  if (
    items.length !== target.serviceIds.length ||
    items.some((item) => !supportsService(type.code, item.code))
  )
    throw new AppError(
      400,
      'INVALID_SERVICES',
      'Algún servicio no está disponible para este tipo de vehículo.',
    );
  assertWashSelection(items.map((item) => item.code));
  return {
    vehicle,
    typeId,
    items,
    totalCents: items.reduce((sum, i) => sum + i.priceCents, 0),
    durationMinutes: items.reduce((sum, i) => sum + i.durationMinutes, 0),
  };
}

/** Oculta vehículos ajenos y bajas lógicas incluso para una cotización directa. */
async function ownedVehicle(actor: Actor, id: string, executor?: Executor) {
  const vehicle = await findVehicle(id, executor);
  if (
    !vehicle ||
    vehicle.deletedAt ||
    (actor.role === 'client' && vehicle.ownerId !== actor.id)
  )
    throw new NotFoundError();
  return vehicle;
}
