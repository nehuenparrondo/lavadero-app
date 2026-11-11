import { refreshResources, revalidateResources } from '../utils/refreshResources';
import type { Service, Settings, User, VehicleType } from '../types/entities';
import { useOptions } from './useOptions';
import { useRemoteData } from './useRemoteData';
/** Recursos y recarga de los selectores, separados de la cotización dependiente.
 * @param admin Habilita lectura de clientes, validada además en servidor.
 * @returns Recursos actuales y recarga conjunta.
 */
export function useBookingOptions(admin: boolean) {
  const types = useRemoteData<VehicleType[]>('/vehicle-types');
  const clients = useOptions<User>('/users', { role: 'client' }, admin);
  const services = useRemoteData<Service[]>('/services');
  const settings = useRemoteData<Settings>('/business');
  return {
    types,
    clients,
    services,
    settings,
    refresh: () => refreshResources(types, clients, services, settings),
    revalidate: () => revalidateResources(types, clients, services, settings),
    optionsLoading: types.loading || clients.loading || services.loading || settings.loading,
    loadError: types.error || clients.error || services.error || settings.error,
  };
}
