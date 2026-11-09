import { canBook } from '../utils/bookingAvailability';
import { useAuth } from './useAuth';
import { useBookingResources } from './useBookingResources';
import { useBookingSelection } from './useBookingSelection';
import { useBookingSubmit } from './useBookingSubmit';
import type { RefreshTrigger } from '../utils/refreshGate';
/** Compone selección, consulta y confirmación sin lógica de negocio dentro de la pantalla.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useBooking() {
  const { user } = useAuth();
  const admin = user?.role === 'admin';
  const selection = useBookingSelection(admin ? '' : (user?.id ?? ''));
  const resources = useBookingResources(selection, admin);
  const ready = canBook(
    resources.availability.data,
    selection.slot,
    resources.availability.loading,
    resources.availability.error,
  );
  const submission = useBookingSubmit(selection, admin, resources.availability.refresh, ready);
  return {
    ...selection,
    ...resources,
    ...submission,
    admin,
    canSubmit: ready && !resources.optionsLoading && !resources.loadError,
    revalidateAvailability: (trigger: RefreshTrigger) => {
      if (submission.busy) return;
      if (trigger === 'resume') return resources.refresh();
      if (!resources.availability.loading) return resources.availability.revalidate();
    },
  };
}
