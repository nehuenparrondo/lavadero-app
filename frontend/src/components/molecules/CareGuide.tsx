import { useTheme } from '../../hooks/useTheme';
import { AppIcon } from '../atoms/AppIcon';
import { Text } from '../atoms/Text';
import { Card } from './Card';
/** Ayuda basada en funciones existentes, sin prometer servicios ni tiempos fijos.
 * @returns Pasos de la experiencia y recordatorio de consultar el estado antes de llegar.
 */
export function CareGuide() {
  const { colors } = useTheme();
  return (
    <Card style={{ backgroundColor: colors.soft }}>
      <AppIcon name="shield" size={28} color={colors.primary} />
      <Text style={{ fontSize: 19, fontWeight: '700' }}>Nos ocupamos de cada detalle.</Text>
      <Text style={{ fontSize: 14, lineHeight: 23, color: colors.muted }}>
        Reservá online, consultá la confirmación y seguí el estado de tu lavado desde Mis
        turnos.
      </Text>
      <Text style={{ fontSize: 12, lineHeight: 19, color: colors.muted }}>
        ¿Cambió tu día? Revisá las condiciones de cancelación en el detalle de tu reserva.
      </Text>
    </Card>
  );
}
