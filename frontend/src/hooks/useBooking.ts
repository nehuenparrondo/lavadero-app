import { useAuth } from './useAuth';
import { useBookingConfirmation } from './useBookingConfirmation';
import { useBookingResources } from './useBookingResources';
import { useBookingSelection } from './useBookingSelection';
import type { RefreshTrigger } from '../utils/refreshGate';
/** Compone selección, consulta y confirmación sin lógica de negocio dentro de la pantalla.
 * @returns Selección, cotización vigente, horarios libres, confirmación y sondeo; canSubmit se desactiva ante carga o error.
 */
export function useBooking() {
  const { user } = useAuth();
  const admin = user?.role === 'admin';
  const selection = useBookingSelection(admin ? '' : (user?.id ?? ''));
  const resources = useBookingResources(selection, admin);
  const submission = useBookingConfirmation(selection, resources, admin);
  return {
    ...selection,
    ...resources,
    ...submission,
    admin,
    revalidateAvailability: (trigger: RefreshTrigger) => {
      if (submission.busy) return;
      if (trigger === 'resume') return resources.revalidate();
      if (!resources.availability.loading) return resources.revalidate();
    },
  };
}
