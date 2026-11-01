import { View } from 'react-native';
import { useProfile } from '../../hooks/useProfile';
import { Avatar } from '../atoms/Avatar';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
/** Identifica la sesión propia con nombre, email y avatar opcional.
 * @param props - Propiedades tipadas: p.
 * @returns Vista de ProfileIdentity con el contrato de propiedades declarado.
 */
export function ProfileIdentity({ p }: { p: ReturnType<typeof useProfile> }) {
  return (
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
  );
}
