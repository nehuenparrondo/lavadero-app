import { Link } from 'expo-router';
import { loginFields } from '../../constants/authFields';
import { useSignIn } from '../../hooks/useSignIn';
import { useTheme } from '../../hooks/useTheme';
import { Card } from '../molecules/Card';
import { Notice } from '../molecules/Notice';
import { SectionHeader } from '../molecules/SectionHeader';
import { EntityForm } from './EntityForm';
/** Presenta sign in form con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: login. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function SignInForm({ login }: { login: ReturnType<typeof useSignIn> }) {
  const { colors } = useTheme();
  return (
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
  );
}
