import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/** Retorna tema y selector. @throws Error fuera de ThemeProvider.
 * @returns Modo elegido, paleta resuelta y operación para persistir la preferencia.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme requiere ThemeProvider.');
  return value;
}
