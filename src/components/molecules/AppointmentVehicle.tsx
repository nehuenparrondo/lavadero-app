import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Appointment } from '../../types/entities';
import { AppIcon } from '../atoms/AppIcon';
import { Text } from '../atoms/Text';
/** Datos operativos presentes en la proyección de todos los roles.
 * @param props Turno ya autorizado, con resumen opcional de servicios.
 * @returns Patente, vehículo, color y servicio, sin datos financieros.
 */
export function AppointmentVehicle({ appointment: a }: { appointment: Appointment }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
      <View style={{ padding: 13, backgroundColor: colors.soft, borderRadius: 12 }}>
        <AppIcon name="car" size={25} color={colors.primary} />
      </View>
      <View style={{ flex: 1, minWidth: 0, gap: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', letterSpacing: 0.5 }}>
          {a.plate ?? a.vehicleType}
        </Text>
        <Text style={{ fontSize: 13, color: colors.muted }}>
          {a.plate ? `${a.brand} ${a.model} · ${a.color}` : 'Vehículo pendiente de cargar'}
        </Text>
        {a.serviceSummary && (
          <Text style={{ fontSize: 13, color: colors.muted }}>{a.serviceSummary}</Text>
        )}
      </View>
    </View>
  );
}
