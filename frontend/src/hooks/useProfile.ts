import { profileFields } from '../constants/profileFields';
import { profileCommands } from './profileCommands';
import { useAction } from './useAction';
import { useAuth } from './useAuth';
/** Perfil propio con formularios, sesión y comandos separados por responsabilidad.
 * @returns Perfil propio, campos iniciales y comandos de guardado y contraseña; la cabecera gestiona la salida.
 */
export function useProfile() {
  const auth = useAuth();
  const action = useAction();
  const user = auth.user;
  const initialValues = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    phone: user?.phone ?? '',
  };
  return {
    ...action,
    ...profileCommands(auth, action),
    user,
    fields: profileFields,
    initialValues,
  };
}
