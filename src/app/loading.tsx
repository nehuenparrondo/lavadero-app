import { Redirect } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { LoadingState } from '../components/molecules/LoadingState';

/** Mantiene el navegador montado mientras se restaura y verifica la sesión. */
export default function LoadingRoute() {
  const { restoring, user } = useAuth();
  return restoring ? (
    <LoadingState label="Verificando tu sesión…" />
  ) : (
    <Redirect href={user ? '/' : '/sign-in'} />
  );
}
