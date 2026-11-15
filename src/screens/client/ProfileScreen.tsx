import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/molecules/Card';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { EntityForm } from '../../components/organisms/EntityForm';
import { ProfileIdentity } from '../../components/organisms/ProfileIdentity';
import { ProfilePasswordForm } from '../../components/organisms/ProfilePasswordForm';
import { Screen } from '../../components/organisms/Screen';
import { ThemeSelector } from '../../components/organisms/ThemeSelector';
import { useProfile } from '../../hooks/useProfile';
import { useTheme } from '../../hooks/useTheme';
/** Perfil, preferencia de tema persistente, contraseña local y cierre de sesión.
 * @returns Vista de ProfileScreen con el contrato de propiedades declarado.
 */
export function ProfileScreen() {
  const p = useProfile();
  const theme = useTheme();
  return (
    <Screen>
      <SectionHeader title="Mi perfil" />
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
      {p.user?.role !== 'admin' && <ThemeSelector theme={theme} />}
      {p.user?.hasPassword && <ProfilePasswordForm p={p} />}
      <Button
        label="Cerrar sesión"
        variant="danger"
        onPress={() => {
          void p.signOut();
        }}
      />
    </Screen>
  );
}
