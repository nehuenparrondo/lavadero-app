import type { Availability, Service, User, Vehicle } from '../types/entities';
import type { useBookingSelection } from './useBookingSelection';
import { useOptions } from './useOptions';
import { useRemoteData } from './useRemoteData';
/** Carga opciones autorizadas y cotiza una selección con forma válida.
 * @param s Selección local de titular, vehículo, servicios, fecha y horario.
 * @param admin Permite consultar clientes para reserva asistida; no concede permisos.
 * @returns Opciones filtradas por titular/tarifa, disponibilidad y error de carga.
 */
export function useBookingResources(
  s: ReturnType<typeof useBookingSelection>,
  admin: boolean,
) {
  const vehicles = useOptions<Vehicle>('/vehicles');
  const clients = useOptions<User>('/users', { role: 'client' }, admin);
  const services = useRemoteData<Service[]>('/services');
  const vehicle = vehicles.items.find((v) => v.id === s.vehicleId);
  const offered = (services.data ?? []).filter(
    (item) =>
      item.isActive && item.prices.some((p) => p.vehicleTypeId === vehicle?.vehicleTypeId),
  );
  const ready = Boolean(s.vehicleId && s.serviceIds && /^\d{4}-\d{2}-\d{2}$/u.test(s.date));
  const availability = useRemoteData<Availability>(
    '/availability',
    { date: s.date, vehicleId: s.vehicleId, serviceIds: s.serviceIds },
    ready,
  );
  return {
    availability,
    offered,
    vehicles: vehicles.items.filter((v) => v.ownerId === s.clientId),
    clients: clients.items.filter((c) => c.isActive),
    loadError: vehicles.error || clients.error || services.error,
  };
}
