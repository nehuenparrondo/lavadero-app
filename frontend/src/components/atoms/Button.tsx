import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { IconName } from '../../types/icon';
import { buttonColors } from '../../utils/buttonColors';
import { ButtonContent } from './ButtonContent';
/** Contrato de una acción. El callback no se ejecuta mientras carga o está deshabilitada. */
export interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'quiet';
  icon?: IconName;
}
/** Acción de 48 puntos con texto, ícono opcional y estado ocupado accesible.
 * @param props Etiqueta visible, callback, variante semántica y estado de interacción.
 * @returns Pressable con contraste del tema; sustituye su contenido por un spinner al cargar.
 */
export function Button({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  icon,
}: ButtonProps) {
  const { colors } = useTheme();
  const { background, foreground } = buttonColors(variant, colors);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: background,
          opacity: disabled ? 0.45 : pressed ? 0.88 : 1,
          borderColor: variant === 'secondary' ? colors.border : 'transparent',
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
      ]}
    >
      <ButtonContent label={label} color={foreground} icon={icon} loading={loading} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
