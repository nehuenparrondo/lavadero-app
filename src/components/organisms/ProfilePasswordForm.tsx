import { useProfile } from '../../hooks/useProfile';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { EntityForm } from './EntityForm';
/** Presenta profile password form con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: p. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
