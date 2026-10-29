import { Link } from 'expo-router';
import { Screen } from '../../components/organisms/Screen';
import { Card } from '../../components/molecules/Card';
import { EntityForm } from '../../components/organisms/EntityForm';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Text } from '../../components/atoms/Text';
import { Notice } from '../../components/molecules/Notice';
import { SocialLogins } from '../../components/organisms/SocialLogins';
import { loginFields } from '../../constants/authFields';
import { useSignIn } from '../../hooks/useSignIn';
import { useTheme } from '../../hooks/useTheme';
/** Acceso tradicional/social con errores claros y rol decidido por la API. */
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
      <Card>
        <SectionHeader title="Bienvenido" subtitle="Ingresá para continuar" />
        <Notice error={login.error} />
        <EntityForm
          fields={loginFields}
          onSubmit={login.submit}
          busy={login.busy}
          submitLabel="Ingresar"
        />
        <Link
          href="/sign-up"
          style={{ color: colors.primary, textAlign: 'center', padding: 12 }}
        >
          ¿Primera vez? Creá tu cuenta
        </Link>
      </Card>
      <SocialLogins />
      <Text style={{ textAlign: 'center', color: colors.muted, fontSize: 13 }}>
        Lunes a sábado · 9:30 a 16:30
      </Text>
    </Screen>
  );
}
