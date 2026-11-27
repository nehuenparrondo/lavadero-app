import { useReducer } from 'react';
import { bookingDraft, initialBooking } from '../utils/bookingDraft';
import type { BookingDraft } from '../utils/bookingDraft';

/** Cada cambio de titular, categoría, servicios o día invalida el inicio elegido.
 * @param clientId Titular inicial. En una reserva asistida se elige en el formulario.
 * @returns Hora en borrador y hora guardada por separado, sin requerir un vehículo particular.
 */
export function useBookingSelection(clientId: string) {
  const [selection, dispatch] = useReducer(bookingDraft, clientId, initialBooking);
  const choose = (field: Exclude<keyof BookingDraft, 'slot'>, value: string) =>
    dispatch({ type: 'choose', field, value });
  return {
    ...selection,
    serviceIds: [selection.baseId, selection.extraIds].filter(Boolean).join(','),
    chooseClient: (id: string) => choose('clientId', id),
    chooseType: (id: string) => choose('vehicleTypeId', id),
    setBaseId: (v: string) => choose('baseId', v),
    setExtraIds: (v: string) => choose('extraIds', v),
    setDate: (v: string) => choose('date', v),
    setDraftSlot: (v: string) => choose('draftSlot', v),
    saveSlot: () => dispatch({ type: 'save', slot: selection.draftSlot }),
    clearRejectedSlot: (attempted: string) => dispatch({ type: 'reject', slot: attempted }),
  };
}
