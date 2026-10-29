import { Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../hooks/useTheme';
/** Props de una acción accesible. */
export interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'quiet';
}
/** Acción con estado de carga y superficie del tema. */
export function Button({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
}: ButtonProps) {
  const { colors } = useTheme();
  const background =
    variant === 'primary'
      ? colors.primary
      : variant === 'danger'
        ? colors.danger
        : variant === 'quiet'
          ? 'transparent'
          : colors.soft;
  const foreground =
    variant === 'primary'
      ? colors.onPrimary
      : variant === 'danger'
        ? colors.background
        : colors.primary;
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
        <ActivityIndicator color={foreground} />
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
