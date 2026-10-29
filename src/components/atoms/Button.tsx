import { Pressable, StyleSheet } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../hooks/useTheme';
import { tokens } from '../../theme/tokens';

/** Propiedades de una acción primaria accesible. */
export interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}
/** Botón accesible con feedback táctil.
 * @param props Texto, acción y estado deshabilitado.
 * @returns Acción primaria con estilo del tema.
 */
export function Button({ label, onPress, disabled = false }: ButtonProps) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.primary, opacity: disabled || pressed ? 0.6 : 1 },
      ]}
    >
      <Text style={{ color: colors.onPrimary, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: tokens.radius.sm,
    padding: tokens.spacing.md,
  },
});
