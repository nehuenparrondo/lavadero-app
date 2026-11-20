import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { workspaceStyles as s } from '../../theme/workspace.styles';
import { AppIcon } from '../atoms/AppIcon';
import { Text } from '../atoms/Text';
/** Firma de marca compacta para acceso, menú y cabecera.
 * @param props Invierte los colores cuando la firma está sobre el fondo de navegación.
 * @returns Marca vectorial y nombre legible, sin texto convertido en imagen.
 */
export function BrandLockup({ inverse = false }: { inverse?: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={s.brand}>
      <View
        style={[s.brandMark, { backgroundColor: inverse ? colors.accent : colors.primary }]}
      >
        <AppIcon name="drop" color={inverse ? colors.navy : colors.onPrimary} size={23} />
      </View>
      <View style={{ gap: 3 }}>
        <Text style={[s.brandTitle, { color: inverse ? colors.onNavy : colors.text }]}>
          LAVADERO
        </Text>
        <Text style={[s.eyebrow, { color: inverse ? colors.navMuted : colors.muted }]}>
          CUIDAMOS TU AUTO
        </Text>
      </View>
    </View>
  );
}
