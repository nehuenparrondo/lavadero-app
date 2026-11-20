import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { workspaceStyles as s } from '../../theme/workspace.styles';
import type { NavigationItem } from '../../types/navigation';
import { AppIcon } from '../atoms/AppIcon';
import { Text } from '../atoms/Text';
/** Destino lateral con selección persistente y respuesta de hover/teclado del Pressable.
 * @param props Destino autorizado por rol e indicador de coincidencia con la ruta actual.
 * @returns Control de navegación con nombre y estado seleccionado accesibles.
 */
export function SidebarLink({ item, active }: { item: NavigationItem; active: boolean }) {
  const { colors } = useTheme();
  const router = useRouter();
  const color = active ? colors.navy : colors.navMuted;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={() => router.push(item.href)}
      style={({ pressed }) => [
        s.navItem,
        {
          backgroundColor: active ? colors.accent : pressed ? '#FFFFFF18' : 'transparent',
        },
      ]}
    >
      <AppIcon name={item.icon} color={color} size={19} />
      <Text style={[s.navLabel, { color }]}>{item.label}</Text>
    </Pressable>
  );
}
