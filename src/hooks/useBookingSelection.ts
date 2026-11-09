import { useState } from 'react';
import { today } from '../utils/format';
/** Selección de reserva; cambiar titular, vehículo, servicios o fecha invalida el horario previo.
 * @param clientId - Titular de la reserva o del vehículo, sujeto a ownership.
 * @returns Selección y setters que invalidan el horario cuando cambia cualquier dependencia.
 */
export function useBookingSelection(clientId: string) {
  const [selection, setSelection] = useState({
    clientId,
    vehicleId: '',
    serviceIds: '',
    date: today(),
    slot: '',
  });
  const choose = (field: keyof typeof selection, value: string) =>
    setSelection((current) => ({
      ...current,
      [field]: value,
      ...(field !== 'slot' ? { slot: '' } : {}),
      ...(field === 'clientId' ? { vehicleId: '', serviceIds: '' } : {}),
      ...(field === 'vehicleId' ? { serviceIds: '' } : {}),
    }));
  return {
    ...selection,
    chooseClient: (id: string) => choose('clientId', id),
    chooseVehicle: (id: string) => choose('vehicleId', id),
    setServiceIds: (v: string) => choose('serviceIds', v),
    setDate: (v: string) => choose('date', v),
    setSlot: (v: string) => choose('slot', v),
    clearRejectedSlot: (attempted: string) =>
      setSelection((current) =>
        current.slot === attempted ? { ...current, slot: '' } : current,
      ),
  };
}
