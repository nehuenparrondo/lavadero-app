import type { Service, Vehicle } from '../types/entities';
import { validDate } from './calendar';
/** Deriva opciones y validez sin confiar en identificadores que ya no están disponibles.
 * @param selection Titular, vehículo, servicios y fecha elegidos.
 * @param vehicles Opciones autorizadas actuales del servidor.
 * @param services Catálogo actual con tarifas por categoría.
 * @returns Vehículos del titular, servicios compatibles y estado de cotización.
 */
export function bookingOptions(
  selection: { clientId: string; vehicleId: string; serviceIds: string; date: string },
  vehicles: Vehicle[],
  services: Service[],
) {
  const ownVehicles = vehicles.filter((v) => v.ownerId === selection.clientId);
  const vehicle = ownVehicles.find((v) => v.id === selection.vehicleId);
  const offered = services.filter(
    (item) =>
      item.isActive && item.prices.some((p) => p.vehicleTypeId === vehicle?.vehicleTypeId),
  );
  const selectedIds = selection.serviceIds.split(',');
  const selected = offered.filter((s) => selectedIds.includes(s.id));
  const needsWash =
    selected.some((s) => s.code === 'wax') &&
    !selected.some((s) => s.code === 'exterior' || s.code === 'complete');
  const ready = Boolean(
    vehicle &&
    selection.serviceIds &&
    !needsWash &&
    validDate(selection.date) &&
    selectedIds.every((id) => offered.some((item) => item.id === id)),
  );
  return { vehicles: ownVehicles, offered, ready, needsWash };
}
