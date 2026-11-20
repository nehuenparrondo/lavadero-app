import { Pressable, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { overviewStyles as s } from '../../theme/overview.styles';
import type { IconName } from '../../types/icon';
import { AppIcon } from '../atoms/AppIcon';
import { Text } from '../atoms/Text';
/** Acceso a un recorrido existente; toda la tarjeta mantiene un único objetivo táctil.
 * @param props Título, contexto, ícono y callback conectado por la pantalla.
 * @returns Tarjeta navegable con texto que admite varias líneas.
 */
export function QuickAction({
  title,
  detail,
  icon,
  onPress,
}: {
  title: string;
  detail: string;
  icon: IconName;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [
        s.quick,
        {
          borderColor: colors.border,
          backgroundColor: pressed ? colors.soft : colors.surface,
        },
      ]}
    >
      <View style={s.quickTop}>
        <View style={[s.iconTile, { backgroundColor: colors.soft }]}>
          <AppIcon name={icon} color={colors.primary} />
        </View>
        <AppIcon name="arrow" size={18} color={colors.muted} />
      </View>
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 16, fontWeight: '700' }}>{title}</Text>
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 20 }}>{detail}</Text>
      </View>
    </Pressable>
  );
}
