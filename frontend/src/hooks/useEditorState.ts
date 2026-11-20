import { useState } from 'react';
/** Mantiene exclusivamente la selección y apertura de un editor de entidad.
 * @returns Entidad seleccionada y controles para abrir alta/edición, cerrar y solicitar/cancelar el diálogo de baja.
 */
export function useEditorState<T>() {
  const [editing, setEditing] = useState<T | null>(null);
  const [deleting, setDeleting] = useState<T | null>(null);
  const [open, setOpen] = useState(false);
  const create = () => {
    setEditing(null);
    setOpen(true);
  };
  const edit = (value: T) => {
    setEditing(value);
    setOpen(true);
  };
  return {
    editing,
    deleting,
    open,
    create,
    edit,
    setDeleting,
    close: () => setOpen(false),
    cancelDelete: () => setDeleting(null),
    requestDelete: setDeleting,
  };
}
