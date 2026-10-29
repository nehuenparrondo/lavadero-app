import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
/** Accede a sesión verificada. @throws Error si falta AuthProvider. */
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('Falta AuthProvider.');
  return value;
}
