import { Redirect } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
/** Entrada dirige al árbol del rol autorizado.
 * @returns Vista de Index con el contrato de propiedades declarado.
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
