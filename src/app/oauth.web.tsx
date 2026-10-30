import { Redirect, Link } from 'expo-router';
import { Screen } from '../components/organisms/Screen';
import { LoadingState } from '../components/molecules/LoadingState';
import { Notice } from '../components/molecules/Notice';
import { useWebOAuthReturn } from '../hooks/useWebOAuthReturn';

/** Retorno web en la misma pestaña; el APK usa oauth.tsx y AuthSession nativo. */
export default function WebOAuthReturn() {
  const { user, error } = useWebOAuthReturn();
  if (user) return <Redirect href="/" />;
  return (
    <Screen>
      {error ? (
        <Notice error={error} />
      ) : (
        <LoadingState label="Completando el acceso social…" />
      )}
      <Link href="/sign-in">Volver al inicio de sesión</Link>
    </Screen>
  );
}
