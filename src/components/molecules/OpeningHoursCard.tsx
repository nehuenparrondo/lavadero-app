import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { tokens } from '../../theme/tokens';
import type { HealthState } from '../../types/health';
import { Text } from '../atoms/Text';
import { ConnectionStatus } from './ConnectionStatus';

/** Muestra el horario confirmado y el estado real de conexión.
 * @param props Estado de red y acción de reintento.
 * @returns Tarjeta con horario y acción cuando la red falla.
 */
export function OpeningHoursCard({
  state,
  onRetry,
}: {
  state: HealthState;
  onRetry: () => void;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        padding: tokens.spacing.lg,
        borderRadius: tokens.radius.md,
        gap: tokens.spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text style={{ fontWeight: '700' }}>Te esperamos de 9:30 a 16:30</Text>
      <ConnectionStatus state={state} onRetry={onRetry} />
    </View>
  );
}
