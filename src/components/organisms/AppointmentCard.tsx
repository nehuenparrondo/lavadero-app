import { Pressable, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Appointment } from '../../types/entities';
import { appointmentDate } from '../../utils/format';
import { Text } from '../atoms/Text';
import { AppointmentCardFooter } from '../molecules/AppointmentCardFooter';
import { AppointmentVehicle } from '../molecules/AppointmentVehicle';
import { Card } from '../molecules/Card';
import { StatusBadge } from '../molecules/StatusBadge';
/** Resumen compartido por los tres roles; no amplía los datos recibidos de la API.
 * @param props Turno autorizado y callback que abre su detalle.
 * @returns Un objetivo táctil con fecha, estado, vehículo y total condicionado a permisos.
 */
export function AppointmentCard({
  appointment: a,
  onPress,
}: {
  appointment: Appointment;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={'Ver turno de ' + a.plate + ', ' + appointmentDate(a.startsAt)}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
    >
      <Card>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 12, color: colors.muted, fontWeight: '600' }}>
            {appointmentDate(a.startsAt)}
          </Text>
          <StatusBadge status={a.status} />
        </View>
        <AppointmentVehicle appointment={a} />
        <AppointmentCardFooter appointment={a} />
      </Card>
    </Pressable>
  );
}
