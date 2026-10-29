import { Redirect, Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from '../hooks/useAuth';
import { Screen } from '../components/organisms/Screen';
import { Text } from '../components/atoms/Text';
WebBrowser.maybeCompleteAuthSession();
/** Destino nativo de AuthSession; el popup devuelve el código al hook iniciador. */
export default function OAuthReturn() {
  const { user } = useAuth();
  return user ? (
    <Redirect href="/" />
  ) : (
    <Screen>
      <Text>Completando el acceso social…</Text>
      <Link href="/sign-in">Volver al inicio de sesión</Link>
    </Screen>
  );
}
