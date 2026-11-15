import { useState } from 'react';
import { writeResource } from '../api/services/resourceService';
import { useAction } from './useAction';

/** Limpia solo el inicio después de confirmar; Mis turnos y la operación conservan los datos.
 * @param refresh Recarga las tarjetas al confirmar el servidor.
 * @returns Diálogo, estado de envío y limpieza persistente propia.
 */
export function useHomeClear(refresh: () => Promise<void>) {
  const [open, setOpen] = useState(false);
  const action = useAction();
  const clear = async () => {
    if (action.busy) return;
    const result = await action.run(
      () => writeResource('post', '/appointments/home-clear'),
      'Inicio limpio. Tus reservas siguen en Mis turnos.',
    );
    if (result !== undefined) {
      setOpen(false);
      await refresh();
    }
  };
  return { open, setOpen, action, clear };
}
