import { useRouter } from 'expo-router';
import { writeResource } from '../api/services/resourceService';
import type { Appointment } from '../types/entities';
import { useAction } from './useAction';
import type { useBookingSelection } from './useBookingSelection';
/** Envía la intención de reserva sin confiar en el precio de la interfaz.
 * @param s Selección actual con inicio ofrecido por disponibilidad.
 * @param admin Incluye clientId solo para reserva asistida.
 * @param refresh Recotiza si el servidor rechaza, por ejemplo por un horario ocupado.
 * @returns Estado de acción y submit; navega solo después de confirmar.
 */
export function useBookingSubmit(
  s: ReturnType<typeof useBookingSelection>,
  admin: boolean,
  refresh: () => Promise<void>,
) {
  const action = useAction();
  const router = useRouter();
  const submit = async () => {
    const result = await action.run(
      () =>
        writeResource<Appointment>('post', '/appointments', {
          vehicleId: s.vehicleId,
          serviceIds: s.serviceIds.split(','),
          startsAt: s.slot,
          ...(admin ? { clientId: s.clientId } : {}),
        }),
      'Turno reservado.',
    );
    if (result) router.replace(`/appointment/${result.id}`);
    else {
      s.setSlot('');
      void refresh();
    }
  };
  return { ...action, submit };
}
