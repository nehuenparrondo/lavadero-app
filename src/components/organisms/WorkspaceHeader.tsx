import { View } from 'react-native';
import { roleLabels } from '../../constants/roleNavigation';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { workspaceStyles as s } from '../../theme/workspace.styles';
import { Text } from '../atoms/Text';
import { BrandLockup } from '../molecules/BrandLockup';
import { WorkspaceHeaderActions } from './WorkspaceHeaderActions';
/** Cabecera visual común; su área interactiva conserva su propio estado de menú.
 * @param props Indica si la navegación lateral ya está visible.
 * @returns Marca o contexto del rol, sin duplicar cabeceras del navegador.
 */
export function WorkspaceHeader({ wide }: { wide: boolean }) {
  const { user } = useAuth();
  const { colors } = useTheme();
  return (
    <View
      style={[
        s.header,
        !wide && s.mobileHeader,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      {wide ? (
        <Text style={{ fontSize: 13, color: colors.muted }}>
          {user ? roleLabels[user.role] : 'Bienvenido'}
        </Text>
      ) : (
        <BrandLockup />
      )}
      <WorkspaceHeaderActions wide={wide} />
    </View>
  );
}
