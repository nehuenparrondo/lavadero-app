import { Link, Redirect } from 'expo-router';
import { LoadingState } from '../components/molecules/LoadingState';
import { Notice } from '../components/molecules/Notice';
import { OAuthLinkForm } from '../components/organisms/OAuthLinkForm';
import { Screen } from '../components/organisms/Screen';
import { useWebOAuthReturn } from '../hooks/useWebOAuthReturn';

/** Retorno web en la misma pestaña; el APK usa oauth.tsx y AuthSession nativo.
 * @returns Vista de WebOAuthReturn con el contrato de propiedades declarado.
 */
export default function WebOAuthReturn() {
  const login = useWebOAuthReturn();
  const { user, error } = login;
  if (user) return <Redirect href="/" />;
  return (
    <Screen>
      {login.linkRequired ? (
        <OAuthLinkForm onSubmit={login.confirm} busy={login.busy} error={error} />
      ) : error ? (
        <Notice error={error} />
      ) : (
        <LoadingState label="Completando el acceso social…" />
      )}
      <Link href="/sign-in">Volver al inicio de sesión</Link>
    </Screen>
  );
}
