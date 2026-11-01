import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Appointment } from '../../types/entities';
import { money } from '../../utils/format';
import { AppIcon } from '../atoms/AppIcon';
import { Text } from '../atoms/Text';
/** La ausencia de importe significa falta de permiso, nunca un total cero.
 * @param props Turno autorizado, que puede omitir importes para empleados.
 * @returns Nombre operativo y total solo cuando el servidor lo incluyó.
 */
export function AppointmentCardFooter({ appointment: a }: { appointment: Appointment }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        paddingTop: 14,
        borderTopWidth: 1,
        borderColor: colors.border,
        flexWrap: 'wrap',
      }}
    >
      <Text style={{ fontSize: 12, color: colors.muted, flex: 1 }}>
        {a.clientName}
        {a.employeeName ? ' · ' + a.employeeName : ''}
      </Text>
      {a.totalCents !== undefined && (
        <Text style={{ fontWeight: '700', fontSize: 16 }}>{money(a.totalCents)}</Text>
      )}
      <AppIcon name="arrow" size={18} color={colors.primary} />
    </View>
  );
}
