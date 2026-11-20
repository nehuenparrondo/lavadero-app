import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { tokens } from '../../theme/tokens';
import type { HealthState } from '../../types/health';
import { Text } from '../atoms/Text';
import { OpeningHoursCard } from '../molecules/OpeningHoursCard';

/** Presentación inicial del producto.
 * @param props Estado de red y callback de reintento.
 * @returns Bienvenida y tarjeta de horario/conectividad.
 */
export function WelcomePanel({ state, onRetry }: { state: HealthState; onRetry: () => void }) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: tokens.spacing.lg }}>
      <Text style={{ color: colors.primary, fontWeight: '800', letterSpacing: 3 }}>
        LAVADERO
      </Text>
      <Text
        accessibilityRole="header"
        style={{ fontSize: tokens.fontSize.display, fontWeight: '800', lineHeight: 50 }}
      >
        Tu auto, en buenas manos.
      </Text>
      <Text style={{ color: colors.muted, lineHeight: 25 }}>
        Estamos preparando una forma más simple de reservar y seguir el lavado de tu vehículo.
      </Text>
      <OpeningHoursCard state={state} onRetry={onRetry} />
    </View>
  );
}
