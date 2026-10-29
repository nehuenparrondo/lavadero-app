import { View } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { useTheme } from '../../hooks/useTheme';
/** Mensaje de error/éxito anunciado a lectores de pantalla. */
export function Notice({
  error,
  message,
  onRetry,
}: {
  error?: string | undefined;
  message?: string | undefined;
  onRetry?: () => void;
}) {
  const { colors } = useTheme();
  if (!error && !message) return null;
  return (
    <View
      accessibilityLiveRegion="polite"
      style={{ padding: 14, borderRadius: 12, gap: 8, backgroundColor: colors.soft }}
    >
      <Text style={{ color: error ? colors.danger : colors.success }}>{error || message}</Text>
      {error && onRetry && (
        <Button label="Volver a intentar" onPress={onRetry} variant="quiet" />
      )}
    </View>
  );
}
