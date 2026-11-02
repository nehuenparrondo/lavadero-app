import type { Availability } from '../types/entities';
import { bookingOptions } from '../utils/bookingSelection';
import { useBookingOptions } from './useBookingOptions';
import type { useBookingSelection } from './useBookingSelection';
import { useRemoteData } from './useRemoteData';
/** Cotiza solo selecciones compatibles y recarga opciones al volver de registrar un auto.
 * @param s Selección local de la reserva.
 * @param admin Habilita reserva asistida, sujeta a permisos del servidor.
 * @returns Opciones y disponibilidad del filtro actual, con recarga conjunta.
 */
export function useBookingResources(
  s: ReturnType<typeof useBookingSelection>,
  admin: boolean,
) {
  const options = useBookingOptions(admin);
  const selection = bookingOptions(s, options.vehicles.items, options.services.data ?? []);
  const availability = useRemoteData<Availability>(
    '/availability',
    { date: s.date, vehicleId: s.vehicleId, serviceIds: s.serviceIds },
    selection.ready,
  );
  const refresh = async () => {
    await options.refresh();
    await availability.refresh();
  };
  return {
    ...selection,
    availability,
    settings: options.settings.data,
    clients: options.clients.items.filter((c) => c.isActive),
    refresh,
    optionsLoading: options.optionsLoading,
    loadError: options.loadError,
  };
}
