import { Redirect } from 'expo-router';
import { LoadingState } from '../components/molecules/LoadingState';
import { Notice } from '../components/molecules/Notice';
import { useAuth } from '../hooks/useAuth';

/** Mantiene el navegador montado mientras se restaura y verifica la sesión.
 * @returns Vista de LoadingRoute con el contrato de propiedades declarado.
 */
export default function LoadingRoute() {
  const { restoring, user, restoreError, retryRestore } = useAuth();
  if (restoreError) return <Notice error={restoreError} onRetry={retryRestore} />;
  return restoring ? (
    <LoadingState label="Verificando tu sesión…" />
  ) : (
    <Redirect href={user ? '/' : '/sign-in'} />
  );
}
