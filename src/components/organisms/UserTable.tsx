import { View } from 'react-native';
import { Card } from '../molecules/Card';
import { Text } from '../atoms/Text';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import type { User } from '../../types/entities';
const labels = { admin: 'Administrador', employee: 'Empleado', client: 'Cliente' };
/** Usuarios como filas adaptables a tarjetas en teléfono. */
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
