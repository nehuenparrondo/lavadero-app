import { useProfile } from '../../hooks/useProfile';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { EntityForm } from './EntityForm';
/** Confirma la contraseña actual y solicita la nueva al servidor.
 * @param props - Propiedades tipadas: p.
 * @returns Vista de ProfilePasswordForm con el contrato de propiedades declarado.
 */
export function ProfilePasswordForm({ p }: { p: ReturnType<typeof useProfile> }) {
  return (
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
  );
}
