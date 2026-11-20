import { useState } from 'react';
import { writeResource } from '../api/services/resourceService';
import type { Appointment } from '../types/entities';
import { useAction } from './useAction';
import type { useWalkInSelection } from './useWalkInSelection';

/** Conserva el mismo UUID al reintentar; el servidor devuelve el turno ya guardado.
 * @param selection Datos presenciales y clave del formulario.
 * @param ready Selección cotizable de servicios.
 * @param refresh Recarga disponibilidad después del intento.
 * @returns Guardado, confirmación persistida y comienzo de otro ingreso.
 */
export function useWalkInActions(
  selection: ReturnType<typeof useWalkInSelection>,
  ready: boolean,
  refresh: () => Promise<void>,
) {
  const action = useAction();
  const [result, setResult] = useState<Appointment | null>(null);
  const save = async () => {
    if (action.busy || !ready) return;
    const payload = {
      requestId: selection.requestId,
      vehicleTypeId: selection.vehicleTypeId,
      serviceIds: selection.serviceIds.split(','),
      ...selection.details,
    };
    const saved = await action.run(
      () => writeResource<Appointment>('post', '/appointments/walk-in', payload),
      'Ingreso registrado.',
    );
    if (saved) setResult(saved);
    await refresh();
  };
  const reset = () => {
    selection.reset();
    setResult(null);
    action.clear();
  };
  return { action, result, save, reset };
}
