import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
/** Accede a sesión verificada. @throws Error si falta AuthProvider.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('Falta AuthProvider.');
  return value;
}
