import { ActivityIndicator, View } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { useTheme } from '../../hooks/useTheme';
import { tokens } from '../../theme/tokens';
import type { HealthState } from '../../types/health';

const labels: Record<HealthState, string> = {
  unconfigured: 'La conexión se habilitará al configurar el servidor.',
  checking: 'Conectando con el lavadero…',
  online: 'Conectado con el lavadero',
  offline:
    'No pudimos conectar. El servidor puede estar iniciándose; volvé a intentar en un minuto.',
};
/** Estado real de red.
 * @param props Estado y callback para volver a conectar.
 * @returns Mensaje, indicador o botón según conectividad.
 */
export function ConnectionStatus({
  state,
  onRetry,
}: {
  state: HealthState;
  onRetry: () => void;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: tokens.spacing.md }} accessibilityLiveRegion="polite">
      {state === 'checking' && <ActivityIndicator color={colors.primary} />}
      <Text style={{ color: state === 'online' ? colors.success : colors.muted }}>
        {labels[state]}
      </Text>
      {state === 'offline' && <Button label="Volver a intentar" onPress={onRetry} />}
    </View>
  );
}
