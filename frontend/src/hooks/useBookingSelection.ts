import { useState } from 'react';

/** Cada cambio de titular, categoría, servicios o día invalida el inicio elegido.
 * @param clientId Titular inicial. En una reserva asistida se elige en el formulario.
 * @returns Selección del turno sin requerir los datos de un vehículo particular.
 */
export function useBookingSelection(clientId: string) {
  const [selection, setSelection] = useState(() => initialBooking(clientId));
  const choose = (field: keyof typeof selection, value: string) =>
    setSelection((current) => ({
      ...current,
      [field]: value,
      ...(field !== 'slot' ? { slot: '' } : {}),
      ...(field === 'clientId' ? { vehicleTypeId: '', baseId: '', extraIds: '' } : {}),
      ...(field === 'vehicleTypeId' ? { baseId: '', extraIds: '' } : {}),
    }));
  return {
    ...selection,
    serviceIds: [selection.baseId, selection.extraIds].filter(Boolean).join(','),
    chooseClient: (id: string) => choose('clientId', id),
    chooseType: (id: string) => choose('vehicleTypeId', id),
    setBaseId: (v: string) => choose('baseId', v),
    setExtraIds: (v: string) => choose('extraIds', v),
    setDate: (v: string) => choose('date', v),
    setSlot: (v: string) => choose('slot', v),
    clearRejectedSlot: (attempted: string) =>
      setSelection((current) =>
        current.slot === attempted ? { ...current, slot: '' } : current,
      ),
  };
}

/** La fecha debe elegirse explícitamente antes de consultar o confirmar horarios. */
function initialBooking(clientId: string) {
  return { clientId, vehicleTypeId: '', baseId: '', extraIds: '', date: '', slot: '' };
}
