import { RecoveryRequestLink } from '../../components/molecules/RecoveryRequestLink';
import { Card } from '../../components/molecules/Card';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { AuthReturnLink } from '../../components/molecules/AuthReturnLink';
import { PasswordResetForm } from '../../components/organisms/PasswordResetForm';
import { RecoveryScreen } from '../../components/organisms/RecoveryScreen';
import { usePasswordReset } from '../../hooks/usePasswordRecovery';
import { useResetToken } from '../../hooks/useResetToken';
/** El token se consume solo al confirmar la nueva contraseña; abrir el correo no lo consume.
 * @returns Formulario de restablecimiento o instrucción de solicitar un enlace válido.
 */
export function ResetPasswordScreen() {
  const token = useResetToken();
  const p = usePasswordReset(token);
  const error =
    p.error ||
    (!token ? 'Abrí el enlace completo de Mailtrap. Si recargaste, volvé al correo.' : '');
  return (
    <RecoveryScreen>
      <Card>
        <SectionHeader
          title="Elegí tu nueva contraseña"
          subtitle="Usá al menos 12 caracteres."
        />
        <Notice error={error} message={p.message} />
        {token && !p.done && <PasswordResetForm submit={p.submit} busy={p.busy} />}
        <RecoveryRequestLink />
        <AuthReturnLink />
      </Card>
    </RecoveryScreen>
  );
}
