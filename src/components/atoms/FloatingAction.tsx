import { Pressable } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { IconName } from '../../types/icon';
import { AppIcon } from './AppIcon';
/** Acción circular con nombre accesible y contraste adaptado al tema.
 * @param props Ícono local, nombre anunciado y acción del usuario.
 * @returns Botón táctil de 48 puntos con foco y estado pulsado.
 */
export function FloatingAction({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        boxShadow: '0px 4px 16px rgba(0,0,0,0.16)',
        opacity: pressed ? 0.65 : 1,
      })}
    >
      <AppIcon name={icon} color={colors.primary} size={22} />
    </Pressable>
  );
}
