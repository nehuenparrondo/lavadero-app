import { useRouter } from 'expo-router';
import { writeResource } from '../api/services/resourceService';
import type { Appointment } from '../types/entities';
import { useAction } from './useAction';
import type { useBookingSelection } from './useBookingSelection';
/** Envía la cotización elegida; el servidor recalcula precios y bloquea disponibilidad.
 * @param s - Respuesta HTTP usada para emitir la redirección del flujo.
 * @param admin - Valor tipado de admin utilizado por esta operación.
 * @param refresh - Vuelve a consultar recursos después de una operación confirmada.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
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
