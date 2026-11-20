import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useWorkspaceLayout } from '../../hooks/useWorkspaceLayout';
import { overviewStyles as s } from '../../theme/overview.styles';
import { Button } from '../atoms/Button';
import { WashIllustration } from '../molecules/WashIllustration';
import { BookingInvitationCopy } from './BookingInvitationCopy';
/** Composición de la acción principal del cliente, sin información comercial fija.
 * @returns Acceso al flujo real de reserva e ilustración cuando hay ancho suficiente.
 */
export function BookingInvitation() {
  const router = useRouter();
  const { colors } = useTheme();
  const { columns } = useWorkspaceLayout();
  return (
    <View style={[s.hero, { backgroundColor: colors.navy }]}>
      <View style={s.heroCopy}>
        <BookingInvitationCopy />
        <View style={{ alignSelf: 'flex-start' }}>
          <Button
            label="Reservar mi lavado"
            icon="arrow"
            onPress={() => router.push('/booking')}
          />
        </View>
      </View>
      {columns && <WashIllustration />}
    </View>
  );
}
