/** Selección local: mover la rueda no confirma ni crea una reserva. */
export interface BookingDraft {
  clientId: string;
  vehicleTypeId: string;
  baseId: string;
  extraIds: string;
  date: string;
  draftSlot: string;
  slot: string;
}

/** Cambios del formulario y guardado explícito de una hora en el resumen. */
export type BookingDraftAction =
  | { type: 'choose'; field: Exclude<keyof BookingDraft, 'slot'>; value: string }
  | { type: 'save' | 'reject'; slot: string };

/** Empieza sin fecha, hora elegida ni hora guardada.
 * @param clientId Titular inicial de la reserva.
 * @returns Borrador vacío; no contiene datos de un vehículo particular.
 */
export function initialBooking(clientId: string): BookingDraft {
  return {
    clientId,
    vehicleTypeId: '',
    baseId: '',
    extraIds: '',
    date: '',
    draftSlot: '',
    slot: '',
  };
}

/** Separa la intención del selector de la hora que el cliente guardó para reservar.
 * @param state Borrador vigente.
 * @param action Cambio del formulario, guardado o rechazo de una reserva enviada.
 * @returns Estado nuevo; descarta acciones tardías que afectarían otra selección.
 */
export function bookingDraft(state: BookingDraft, action: BookingDraftAction): BookingDraft {
  if (action.type === 'choose') return changeBooking(state, action.field, action.value);
  if (action.type === 'save')
    return action.slot && state.draftSlot === action.slot
      ? { ...state, slot: action.slot }
      : state;
  return state.slot === action.slot ? { ...state, slot: '', draftSlot: '' } : state;
}

/** Invalida el horario guardado al modificar los datos que determinan la disponibilidad. */
function changeBooking(
  state: BookingDraft,
  field: Exclude<keyof BookingDraft, 'slot'>,
  value: string,
): BookingDraft {
  if (state[field] === value) return state;
  return {
    ...state,
    slot: '',
    draftSlot: '',
    [field]: value,
    ...(field === 'clientId' ? { vehicleTypeId: '', baseId: '', extraIds: '' } : {}),
    ...(field === 'vehicleTypeId' ? { baseId: '', extraIds: '' } : {}),
  };
}
