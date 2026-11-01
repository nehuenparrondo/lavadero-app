import { View } from 'react-native';
import type { User } from '../../types/entities';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
const labels = { admin: 'Administrador', employee: 'Empleado', client: 'Cliente' };
/** Usuarios como filas adaptables a tarjetas en teléfono.
 * @param props - Propiedades tipadas: users, onEdit, onDelete. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function UserTable({
  users,
  onEdit,
  onDelete,
}: {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}) {
  return (
    <>
      {users.map((user) => (
        <Card key={user.id}>
          <Text style={{ fontSize: 20, fontWeight: '800' }}>
            {user.firstName} {user.lastName}
          </Text>
          <Text>{user.email}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <Badge label={labels[user.role]} />
            <Badge
              label={user.isActive ? 'Activo' : 'Inactivo'}
              tone={user.isActive ? 'success' : 'danger'}
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button label="Editar" variant="secondary" onPress={() => onEdit(user)} />
            <Button label="Eliminar" variant="quiet" onPress={() => onDelete(user)} />
          </View>
        </Card>
      ))}
    </>
  );
}
