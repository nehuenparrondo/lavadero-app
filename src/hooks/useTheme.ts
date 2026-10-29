import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/** Retorna tema y selector. @throws Error fuera de ThemeProvider. */
export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme requiere ThemeProvider.');
  return value;
}
