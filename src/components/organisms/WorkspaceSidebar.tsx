import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { workspaceStyles as s } from '../../theme/workspace.styles';
import { Text } from '../atoms/Text';
import { BrandLockup } from '../molecules/BrandLockup';
import { WorkspaceUser } from '../molecules/WorkspaceUser';
import { SidebarNavigation } from './SidebarNavigation';
/** Estructura lateral independiente del catálogo de destinos y de su selección.
 * @returns Marca, navegación y sesión sobre una superficie de alto contraste.
 */
export function WorkspaceSidebar() {
  const { colors } = useTheme();
  return (
    <View style={[s.sidebar, { backgroundColor: colors.navy }]}>
      <BrandLockup inverse />
      <SidebarNavigation />
      <View style={[s.footer, { borderColor: '#FFFFFF20' }]}>
        <Text style={{ color: colors.navMuted, fontSize: 12, lineHeight: 19 }}>
          Cada detalle cuenta. También tu tiempo.
        </Text>
        <WorkspaceUser inverse />
      </View>
    </View>
  );
}
