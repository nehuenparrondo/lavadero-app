import { Redirect } from 'expo-router';
import { LoadingState } from '../components/molecules/LoadingState';
import { useAuth } from '../hooks/useAuth';

/** Mantiene el navegador montado mientras se restaura y verifica la sesión.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export default function LoadingRoute() {
  const { restoring, user } = useAuth();
  return restoring ? (
    <LoadingState label="Verificando tu sesión…" />
  ) : (
    <Redirect href={user ? '/' : '/sign-in'} />
  );
}
