import { useState } from 'react';

/** Maneja la búsqueda y cierra el diálogo al elegir una opción.
 * @param onChange Publica el identificador seleccionado.
 * @returns Estado y operaciones del selector, independientes de la vista.
 */
export function useSearchSelect(onChange: (value: string) => void) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  return {
    open,
    search,
    setSearch,
    close: () => setOpen(false),
    show: () => {
      setSearch('');
      setOpen(true);
    },
    choose: (value: string) => {
      onChange(value);
      setOpen(false);
    },
  };
}
