import { Card } from '../../components/molecules/Card';
import { Notice } from '../../components/molecules/Notice';
import { EntityForm } from '../../components/organisms/EntityForm';
import { ProfileIdentity } from '../../components/organisms/ProfileIdentity';
import { ProfileHeader } from '../../components/organisms/ProfileHeader';
import { ProfilePasswordForm } from '../../components/organisms/ProfilePasswordForm';
import { Screen } from '../../components/organisms/Screen';
import { useProfile } from '../../hooks/useProfile';
/** Perfil compartido por los tres roles, contraseña local y salida confirmada desde la cabecera.
 * @returns Vista de ProfileScreen con el contrato de propiedades declarado.
 */
export function ProfileScreen() {
  const p = useProfile();
  return (
    <Screen>
      <ProfileHeader />
      <ProfileIdentity p={p} />
      <Notice error={p.error} message={p.message} />
      <Card>
        <EntityForm
          fields={p.fields}
          initialValues={p.initialValues}
          onSubmit={p.save}
          busy={p.busy}
          submitLabel="Guardar perfil"
        />
      </Card>
      {p.user?.hasPassword && <ProfilePasswordForm p={p} />}
    </Screen>
  );
}
