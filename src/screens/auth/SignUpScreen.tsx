import { Screen } from '../../components/organisms/Screen';
import { Card } from '../../components/molecules/Card';
import { EntityForm } from '../../components/organisms/EntityForm';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Notice } from '../../components/molecules/Notice';
import { registerFields } from '../../constants/authFields';
import { useSignIn } from '../../hooks/useSignIn';
/** Registro de clientes con validación por campo. */
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
