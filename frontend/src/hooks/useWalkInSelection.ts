import { randomUUID } from 'expo-crypto';
import { useState } from 'react';

const emptyDetails = {
  plate: '',
  customerName: '',
  customerPhone: '',
  brand: '',
  model: '',
  color: '',
  notes: '',
};

/** Conserva una clave de reintento hasta confirmar o comenzar otro ingreso.
 * @returns Selección mínima, datos opcionales y acciones locales.
 */
export function useWalkInSelection() {
  const [requestId, setRequestId] = useState(() => randomUUID());
  const [selection, setSelection] = useState({ vehicleTypeId: '', baseId: '', extraIds: '' });
  const [details, setDetails] = useState(emptyDetails);
  const chooseType = (id: string) =>
    setSelection({ vehicleTypeId: id, baseId: '', extraIds: '' });
  const setBaseId = (baseId: string) => setSelection((s) => ({ ...s, baseId }));
  const setExtraIds = (extraIds: string) => setSelection((s) => ({ ...s, extraIds }));
  const chooseDetail = (key: keyof typeof emptyDetails, value: string) =>
    setDetails((current) => ({ ...current, [key]: value }));
  const reset = () => {
    setRequestId(randomUUID());
    setDetails(emptyDetails);
  };
  const actions = { chooseType, setBaseId, setExtraIds, chooseDetail, reset };
  return {
    ...selection,
    ...actions,
    requestId,
    details,
    serviceIds: [selection.baseId, selection.extraIds].filter(Boolean).join(','),
  };
}
