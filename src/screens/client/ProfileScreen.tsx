import { View } from 'react-native';
import { Screen } from '../../components/organisms/Screen';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Card } from '../../components/molecules/Card';
import { EntityForm } from '../../components/organisms/EntityForm';
import { Notice } from '../../components/molecules/Notice';
import { Text } from '../../components/atoms/Text';
import { Avatar } from '../../components/atoms/Avatar';
import { ChoiceGroup } from '../../components/molecules/ChoiceGroup';
import { Button } from '../../components/atoms/Button';
import { useProfile } from '../../hooks/useProfile';
import { useTheme } from '../../hooks/useTheme';
import type { ThemeMode } from '../../context/ThemeContext';
/** Perfil, preferencia de tema persistente, contraseña local y cierre de sesión. */
export function ProfileScreen() {
  const p = useProfile();
  const theme = useTheme();
  return (
    <Screen>
      <SectionHeader title="Mi perfil" />
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Avatar name={p.user?.firstName ?? ''} url={p.user?.avatarUrl ?? null} />
          <View>
            <Text style={{ fontWeight: '800', fontSize: 20 }}>
              {p.user?.firstName} {p.user?.lastName}
            </Text>
            <Text style={{ fontSize: 13 }}>{p.user?.email}</Text>
          </View>
        </View>
      </Card>
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
      <Card>
        <Text style={{ fontWeight: '700' }}>Apariencia</Text>
        <ChoiceGroup
          value={theme.mode}
          onChange={(value) => theme.setMode(value as ThemeMode)}
          options={[
            { value: 'system', label: 'Sistema' },
            { value: 'light', label: 'Claro' },
            { value: 'dark', label: 'Oscuro' },
          ]}
        />
      </Card>
      {p.user?.hasPassword && (
        <Card>
          <Text style={{ fontWeight: '700' }}>Cambiar contraseña</Text>
          <EntityForm
            fields={[
              { name: 'currentPassword', label: 'Contraseña actual', kind: 'password' },
              {
                name: 'newPassword',
                label: 'Nueva contraseña',
                kind: 'password',
                minLength: 12,
                maxLength: 72,
              },
            ]}
            onSubmit={p.changePassword}
            busy={p.busy}
            submitLabel="Cambiar contraseña"
          />
        </Card>
      )}
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
