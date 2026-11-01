import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { buttonColors } from '../../utils/buttonColors';
import { Spinner } from './Spinner';
import { Text } from './Text';
/** Props de una acción accesible. */
export interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'quiet';
}
/** Acción con estado de carga y superficie del tema.
 * @param props - Propiedades tipadas: label, onPress, disabled, loading, variant. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function Button({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
}: ButtonProps) {
  const { colors } = useTheme();
  const { background, foreground } = buttonColors(variant, colors);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: background, opacity: disabled || pressed ? 0.6 : 1 },
      ]}
    >
      {loading ? (
        <Spinner color={foreground} />
      ) : (
        <Text style={{ color: foreground, fontWeight: '700', textAlign: 'center' }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
