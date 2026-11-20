import type { Service, VehicleType } from '../types/entities';
import { validDate } from './calendar';

/** Separa los adicionales del único lavado base elegible.
 * @param service Servicio del catálogo.
 * @returns Si se puede combinar como extra.
 */
export function isWashExtra(service: Service) {
  return service.code === 'wax' || service.code === 'upholstery';
}

/** Deriva opciones cotizables para la categoría, aunque el titular todavía no tenga vehículo.
 * @param selection Titular, tipo, servicios y fecha elegidos.
 * @param types Tipos autorizados.
 * @param services Catálogo actual con tarifas por categoría.
 * @returns Lavados base, extras y estado de cotización.
 */
export function bookingOptions(
  selection: { clientId: string; vehicleTypeId: string; serviceIds: string; date: string },
  types: VehicleType[],
  services: Service[],
) {
  const type = types.find((v) => v.id === selection.vehicleTypeId && v.isActive);
  const offered = services.filter(
    (s) => s.isActive && s.prices.some((p) => p.vehicleTypeId === type?.id),
  );
  const selectedIds = selection.serviceIds.split(',').filter(Boolean);
  const selected = offered.filter((s) => selectedIds.includes(s.id));
  const needsWash =
    selected.some((s) => s.code === 'wax') &&
    !selected.some((s) => s.code === 'exterior' || s.code === 'complete');
  const ready = Boolean(
    selection.clientId &&
    type &&
    selected.length &&
    selected.length === selectedIds.length &&
    selected.filter((s) => !isWashExtra(s)).length <= 1 &&
    !needsWash &&
    validDate(selection.date),
  );
  return {
    washes: offered.filter((s) => !isWashExtra(s)),
    extras: offered.filter(isWashExtra),
    ready,
    needsWash,
  };
}
