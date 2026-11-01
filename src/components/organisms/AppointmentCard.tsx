import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Appointment } from '../../types/entities';
import { appointmentDate, money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { StatusBadge } from '../molecules/StatusBadge';
/** Resumen operativo de reserva; la API controla qué importes/datos recibe cada rol.
 * @param props - Propiedades tipadas: appointment, onPress. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function AppointmentCard({
  appointment,
  onPress,
}: {
  appointment: Appointment;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Card>
        <View style={styles.heading}>
          <StatusBadge status={appointment.status} />
          <Text style={{ fontWeight: '700' }}>{appointmentDate(appointment.startsAt)}</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: '800' }}>
          {appointment.plate} · {appointment.brand} {appointment.model}
        </Text>
        <Text style={{ color: colors.muted }}>
          {appointment.color}
          {appointment.serviceSummary ? ` · ${appointment.serviceSummary}` : ''}
        </Text>
        <Text style={{ color: colors.muted }}>
          {appointment.clientName}
          {appointment.employeeName ? ` · ${appointment.employeeName}` : ''}
        </Text>
        {appointment.totalCents !== undefined && (
          <Text style={{ fontWeight: '700', color: colors.primary }}>
            {money(appointment.totalCents)}
          </Text>
        )}
        <Text style={{ fontSize: 13, color: colors.muted }}>Ver detalle →</Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    flexWrap: 'wrap',
  },
});
