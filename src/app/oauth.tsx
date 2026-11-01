import { Link, Redirect } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Text } from '../components/atoms/Text';
import { Screen } from '../components/organisms/Screen';
import { useAuth } from '../hooks/useAuth';
WebBrowser.maybeCompleteAuthSession();
/** Destino nativo de AuthSession; el popup devuelve el código al hook iniciador.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
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
