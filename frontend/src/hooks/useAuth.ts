import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
/** Accede a sesión verificada. @throws Error si falta AuthProvider.
 * @returns Contexto vigente de usuario, restauración y acciones de sesión.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('Falta AuthProvider.');
  return value;
}
