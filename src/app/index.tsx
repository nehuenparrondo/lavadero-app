import { Redirect } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
/** Entrada dirige al árbol del rol autorizado.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export default function Index() {
  const { user } = useAuth();
  return (
    <Redirect
      href={
        !user
          ? '/sign-in'
          : user.role === 'admin'
            ? '/(admin)/dashboard'
            : user.role === 'employee'
              ? '/(employee)/agenda'
              : '/(client)/home'
      }
    />
  );
}
