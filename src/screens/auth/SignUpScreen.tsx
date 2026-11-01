import { Card } from '../../components/molecules/Card';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { EntityForm } from '../../components/organisms/EntityForm';
import { Screen } from '../../components/organisms/Screen';
import { registerFields } from '../../constants/authFields';
import { useSignIn } from '../../hooks/useSignIn';
/** Registro de clientes con validación por campo.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function SignUpScreen() {
  const register = useSignIn(true);
  return (
    <Screen>
      <SectionHeader title="Empecemos" subtitle="Creá tu cuenta y reservá el primer lavado." />
      <Card>
        <Notice error={register.error} />
        <EntityForm
          fields={registerFields}
          onSubmit={register.submit}
          busy={register.busy}
          submitLabel="Crear mi cuenta"
        />
      </Card>
    </Screen>
  );
}
