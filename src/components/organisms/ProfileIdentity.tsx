import { View } from 'react-native';
import { useProfile } from '../../hooks/useProfile';
import { Avatar } from '../atoms/Avatar';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
/** Presenta profile identity con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: p. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
