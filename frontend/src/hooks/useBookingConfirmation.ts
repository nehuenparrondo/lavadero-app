import { canBook } from '../utils/bookingAvailability';
import type { useBookingResources } from './useBookingResources';
import type { useBookingSelection } from './useBookingSelection';
import { useBookingSubmit } from './useBookingSubmit';

/** Guardar solo prepara el resumen; confirmar envía el turno y vuelve a validar en el servidor.
 * @param selection Borrador y hora guardada explícitamente por el cliente.
 * @param resources Catálogo y disponibilidad de la selección vigente.
 * @param admin Permite incluir el titular de una reserva asistida.
 * @returns Acciones separadas y permisos calculados sobre la disponibilidad actual.
 */
export function useBookingConfirmation(
  selection: ReturnType<typeof useBookingSelection>,
  resources: ReturnType<typeof useBookingResources>,
  admin: boolean,
) {
  const valid = (slot: string) =>
    canBook(
      resources.availability.data,
      slot,
      resources.availability.loading,
      resources.availability.error,
    ) &&
    !resources.optionsLoading &&
    !resources.loadError;
  const canSubmit = valid(selection.slot);
  const submission = useBookingSubmit(
    selection,
    admin,
    resources.availability.refresh,
    canSubmit,
  );
  return {
    ...submission,
    canSubmit,
    canSaveSlot: valid(selection.draftSlot) && selection.draftSlot !== selection.slot,
    saveSlot: () => {
      if (submission.busy || !valid(selection.draftSlot)) return false;
      selection.saveSlot();
      return true;
    },
  };
}
