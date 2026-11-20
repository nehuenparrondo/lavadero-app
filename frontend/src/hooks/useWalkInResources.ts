import type { Availability, Service, VehicleType } from '../types/entities';
import { bookingOptions } from '../utils/bookingSelection';
import { today } from '../utils/format';
import { refreshResources, revalidateResources } from '../utils/refreshResources';
import { useRemoteData } from './useRemoteData';
import type { useWalkInSelection } from './useWalkInSelection';

/** Actualiza catálogo y disponibilidad sin descartar el texto que se está escribiendo.
 * @param selection Categoría y servicios elegidos en el registro rápido.
 * @returns Recursos cotizados y recarga coordinada.
 */
export function useWalkInResources(selection: ReturnType<typeof useWalkInSelection>) {
  const types = useRemoteData<VehicleType[]>('/vehicle-types');
  const services = useRemoteData<Service[]>('/services');
  const options = bookingOptions(
    { ...selection, clientId: 'walk-in', date: today() },
    types.data ?? [],
    services.data ?? [],
  );
  const query = {
    date: today(),
    vehicleTypeId: selection.vehicleTypeId,
    serviceIds: selection.serviceIds,
  };
  const availability = useRemoteData<Availability>('/availability', query, options.ready);
  const resources = { types, services, availability };
  return {
    ...options,
    ...resources,
    error: types.error || services.error || availability.error,
    refresh: () => refreshResources(types, services, availability),
    revalidate: () => revalidateResources(types, services, availability),
  };
}
