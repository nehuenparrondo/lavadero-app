import { profileFields } from '../constants/profileFields';
import { profileCommands } from './profileCommands';
import { useAction } from './useAction';
import { useAuth } from './useAuth';
/** Perfil propio con formularios, sesión y comandos separados por responsabilidad.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useProfile() {
  const auth = useAuth();
  const action = useAction();
  const user = auth.user;
  const initialValues = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    phone: user?.phone ?? '',
    avatarUrl: user?.avatarUrl ?? '',
  };
  return {
    ...action,
    ...profileCommands(auth, action),
    user,
    fields: profileFields,
    initialValues,
    signOut: auth.signOut,
  };
}
