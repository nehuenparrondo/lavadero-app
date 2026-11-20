import { useTheme } from '../../hooks/useTheme';
import { overviewStyles as s } from '../../theme/overview.styles';
import { Text } from '../atoms/Text';
/** Contenido editorial de la portada de reserva, independiente de navegación e ilustración.
 * @returns Jerarquía de texto con contraste sobre el fondo oscuro.
 */
export function BookingInvitationCopy() {
  const { colors } = useTheme();
  return (
    <>
      <Text
        style={{ color: colors.accent, fontSize: 11, fontWeight: '700', letterSpacing: 1.5 }}
      >
        UN MOMENTO PARA TU AUTO
      </Text>
      <Text accessibilityRole="header" style={[s.heroTitle, { color: colors.onNavy }]}>
        Impecable por fuera.{'\n'}Simple para vos.
      </Text>
      <Text style={[s.heroDetail, { color: colors.navMuted }]}>
        Elegí el tipo de vehículo, el servicio y tu horario. Cargá la patente después de
        reservar.
      </Text>
    </>
  );
}
