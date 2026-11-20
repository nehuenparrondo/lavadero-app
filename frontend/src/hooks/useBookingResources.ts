import type { Availability } from '../types/entities';
import { bookingOptions } from '../utils/bookingSelection';
import { useBookingOptions } from './useBookingOptions';
import type { useBookingSelection } from './useBookingSelection';
import { useRemoteData } from './useRemoteData';
/** Cotiza por categoría y recarga las opciones vigentes cuando se vuelve al formulario.
 * @param s Selección local de la reserva.
 * @param admin Habilita reserva asistida, sujeta a permisos del servidor.
 * @returns Opciones y disponibilidad del filtro actual, con recarga conjunta.
 */
export function useBookingResources(
  s: ReturnType<typeof useBookingSelection>,
  admin: boolean,
) {
  const options = useBookingOptions(admin);
  const types = (options.types.data ?? []).filter((t) => t.isActive);
  const selection = bookingOptions(s, types, options.services.data ?? []);
  const availability = useRemoteData<Availability>(
    '/availability',
    { date: s.date, vehicleTypeId: s.vehicleTypeId, serviceIds: s.serviceIds },
    selection.ready,
  );
  const refresh = async () => {
    await Promise.all([options.refresh(), availability.refresh()]);
  };
  return {
    ...selection,
    types,
    availability,
    settings: options.settings.data,
    clients: options.clients.items.filter((c) => c.isActive),
    refresh,
    revalidate: async () => {
      await Promise.all([options.revalidate(), availability.revalidate()]);
    },
    optionsLoading: options.optionsLoading,
    loadError: options.loadError,
  };
}
