import { useRef, useState } from 'react';
import { useAuth } from './useAuth';
import { useAction } from './useAction';

/** Pide confirmación antes de borrar la sesión persistente de cualquiera de los tres roles.
 * @returns Visibilidad, acciones de apertura/cierre y confirmación con carga/error sin envíos duplicados.
 */
export function useSignOutConfirmation() {
  const auth = useAuth();
  const action = useAction();
  const [open, setOpen] = useState(false);
  const submitting = useRef(false);
  const show = () => {
    action.clear();
    setOpen(true);
  };
  const close = () => {
    if (!submitting.current) setOpen(false);
  };
  const confirm = async () => {
    if (submitting.current) return;
    submitting.current = true;
    try {
      await action.run(auth.signOut, '');
    } finally {
      submitting.current = false;
    }
  };
  return { open, show, close, confirm, busy: action.busy, error: action.error };
}
