import { Card } from '../../components/molecules/Card';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { AuthReturnLink } from '../../components/molecules/AuthReturnLink';
import { Text } from '../../components/atoms/Text';
import { EntityForm } from '../../components/organisms/EntityForm';
import { RecoveryScreen } from '../../components/organisms/RecoveryScreen';
import { recoveryFields } from '../../constants/recoveryFields';
import { usePasswordRecovery } from '../../hooks/usePasswordRecovery';
/** Recuperación guiada; informa explícitamente el destino Sandbox de esta demostración.
 * @returns Formulario público y confirmación genérica.
 */
export function ForgotPasswordScreen() {
  const p = usePasswordRecovery();
  return (
    <RecoveryScreen>
      <Card>
        <SectionHeader
          title="Recuperá tu acceso"
          subtitle="Te ayudamos a volver a tu cuenta."
        />
        <Text>
          Escribí el correo con el que te registraste. El enlace vence a los 15 minutos y sirve
          una sola vez.
        </Text>
        <Notice message="Modo demostración: los mensajes se capturan en Mailtrap Sandbox. No llegan a tu casilla de correo." />
        <Notice error={p.error} message={p.message} />
        {!p.sent && (
          <EntityForm
            fields={recoveryFields}
            onSubmit={p.submit}
            busy={p.busy}
            submitLabel="Solicitar enlace"
          />
        )}
        <AuthReturnLink />
      </Card>
    </RecoveryScreen>
  );
}
