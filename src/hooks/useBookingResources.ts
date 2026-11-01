import type { Availability, Service, User, Vehicle } from '../types/entities';
import type { useBookingSelection } from './useBookingSelection';
import { useOptions } from './useOptions';
import { useRemoteData } from './useRemoteData';
/** Consulta opciones autorizadas y cotiza únicamente una selección válida.
 * @param s - Respuesta HTTP usada para emitir la redirección del flujo.
 * @param admin - Valor tipado de admin utilizado por esta operación.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
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
