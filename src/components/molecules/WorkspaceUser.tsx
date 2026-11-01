import { View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { roleLabels } from '../../constants/roleNavigation';
import { workspaceStyles as s } from '../../theme/workspace.styles';
import { Avatar } from '../atoms/Avatar';
import { Text } from '../atoms/Text';
/** Identidad de la sesión actual; no consulta ni copia información de otros usuarios.
 * @param props Variante sobre fondo oscuro para la barra lateral.
 * @returns Nombre, rol y avatar; omite el bloque mientras no exista sesión.
 */
export function WorkspaceUser({ inverse = false }: { inverse?: boolean }) {
  const { user } = useAuth();
  const { colors } = useTheme();
  if (!user) return null;
  return (
    <View style={s.user}>
      <Avatar name={user.firstName} url={user.avatarUrl} />
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
    </View>
  );
}
