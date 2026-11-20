import { Pressable } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { IconName } from '../../types/icon';
import { AppIcon } from './AppIcon';

/** Acción visual pequeña con objetivo táctil amplio y etiqueta para lectores de pantalla.
 * @param props Ícono, etiqueta, estado y callback autorizado por el contenedor.
 * @returns Botón de 44 puntos sin texto visible.
 */
export function CompactIconButton({
  icon,
  label,
  onPress,
  disabled = false,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: pressed ? colors.soft : 'transparent',
        opacity: disabled ? 0.35 : 1,
      })}
    >
      <AppIcon name={icon} size={18} color={colors.muted} />
    </Pressable>
  );
}
