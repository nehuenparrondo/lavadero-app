import { usePathname } from 'expo-router';
import { View } from 'react-native';
import { roleNavigation } from '../../constants/roleNavigation';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { workspaceStyles as s } from '../../theme/workspace.styles';
import { Text } from '../atoms/Text';
import { SidebarLink } from '../molecules/SidebarLink';
/** Selección de destinos basada en rol y ruta, sin estado de navegación duplicado.
 * @returns Destinos de la sesión actual o ningún contenido mientras no haya usuario.
 */
export function SidebarNavigation() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const path = usePathname();
  if (!user) return null;
  return (
    <View style={{ gap: 14 }}>
      <Text style={[s.eyebrow, { color: colors.navMuted, paddingLeft: 13 }]}>TU ESPACIO</Text>
      <View style={s.nav}>
        {roleNavigation[user.role].map((item) => (
          <SidebarLink key={item.path} item={item} active={path === item.path} />
        ))}
      </View>
    </View>
  );
}
