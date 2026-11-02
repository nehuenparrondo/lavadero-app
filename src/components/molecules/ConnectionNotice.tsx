import { View } from 'react-native';
import { useConnectionNotice } from '../../hooks/useConnectionNotice';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../atoms/Text';
/** Aviso global durante el arranque, sin sacar al usuario de su pantalla.
 * @returns Mensaje accesible o null cuando la conexión responde normalmente.
 */
export function ConnectionNotice() {
  const visible = useConnectionNotice();
  const { colors } = useTheme();
  if (!visible) return null;
  return (
    <View
      accessibilityLiveRegion="polite"
      pointerEvents="none"
      style={{
        position: 'absolute',
        bottom: 24,
        left: 20,
        right: 20,
        padding: 18,
        borderRadius: 16,
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        zIndex: 100,
      }}
    >
      <Text style={{ fontWeight: '700' }}>Conectando con el lavadero…</Text>
      <Text>
        La primera conexión puede tardar cerca de un minuto. Esperá en esta pantalla.
      </Text>
    </View>
  );
}
