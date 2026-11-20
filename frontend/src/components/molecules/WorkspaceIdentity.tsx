import { View } from 'react-native';
import type { User } from '../../types/entities';
import { roleLabels } from '../../constants/roleNavigation';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../atoms/Text';
/** Nombre y rol de la sesión propia sobre fondos claros u oscuros.
 * @param props Usuario autenticado y variante de la barra lateral.
 * @returns Dos líneas truncadas que no desplazan los controles de navegación.
 */
export function WorkspaceIdentity({ user, inverse }: { user: User; inverse: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, minWidth: 0, gap: 4 }}>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 13,
          fontWeight: '700',
          color: inverse ? colors.onNavy : colors.text,
        }}
      >
        {user.firstName} {user.lastName}
      </Text>
      <Text style={{ fontSize: 11, color: inverse ? colors.navMuted : colors.muted }}>
        {roleLabels[user.role]}
      </Text>
    </View>
  );
}
