import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
/** Mensaje de error/éxito anunciado a lectores de pantalla.
 * @param props - Propiedades tipadas: error, message, onRetry.
 * @returns Vista de Notice con el contrato de propiedades declarado.
 */
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
      style={{
        padding: 16,
        borderRadius: 14,
        gap: 10,
        backgroundColor: error ? colors.dangerSoft : colors.soft,
        borderLeftWidth: 3,
        borderColor: error ? colors.danger : colors.primary,
      }}
    >
      <Text style={{ lineHeight: 22, color: error ? colors.danger : colors.text }}>
        {error || message}
      </Text>
      {error && onRetry && (
        <Button label="Volver a intentar" onPress={onRetry} variant="quiet" />
      )}
    </View>
  );
}
