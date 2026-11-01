import { Text } from '../../components/atoms/Text';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Screen } from '../../components/organisms/Screen';
import { SignInForm } from '../../components/organisms/SignInForm';
import { SocialLogins } from '../../components/organisms/SocialLogins';
import { useSignIn } from '../../hooks/useSignIn';
import { useTheme } from '../../hooks/useTheme';
/** Acceso tradicional/social con errores claros y rol decidido por la API.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function SignInScreen() {
  const login = useSignIn();
  const { colors } = useTheme();
  return (
    <Screen>
      <Text
        style={{ color: colors.primary, fontWeight: '900', letterSpacing: 4, marginTop: 24 }}
      >
        LAVADERO
      </Text>
      <SectionHeader
        title="Tu auto, en buenas manos."
        subtitle="Reservá tu próximo lavado y seguí cada detalle desde acá."
      />
      <SignInForm login={login} />
      <SocialLogins />
      <Text style={{ textAlign: 'center', color: colors.muted, fontSize: 13 }}>
        Lunes a sábado · 9:30 a 16:30
      </Text>
    </Screen>
  );
}
