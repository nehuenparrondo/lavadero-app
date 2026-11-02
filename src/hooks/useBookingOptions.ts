import type { Service, Settings, User, Vehicle } from '../types/entities';
import { useOptions } from './useOptions';
import { useRemoteData } from './useRemoteData';
/** Recursos y recarga de los selectores, separados de la cotización dependiente.
 * @param admin Habilita lectura de clientes, validada además en servidor.
 * @returns Recursos actuales y recarga conjunta.
 */
export function useBookingOptions(admin: boolean) {
  const vehicles = useOptions<Vehicle>('/vehicles');
  const clients = useOptions<User>('/users', { role: 'client' }, admin);
  const services = useRemoteData<Service[]>('/services');
  const settings = useRemoteData<Settings>('/business');
  const refresh = async () => {
    await Promise.all([
      vehicles.refresh(),
      clients.refresh(),
      services.refresh(),
      settings.refresh(),
    ]);
  };
  return {
    vehicles,
    clients,
    services,
    settings,
    refresh,
    optionsLoading:
      vehicles.loading || clients.loading || services.loading || settings.loading,
    loadError: vehicles.error || clients.error || services.error || settings.error,
  };
}
