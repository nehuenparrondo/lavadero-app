import { View } from 'react-native';
import { Text } from '../atoms/Text';
import { useTheme } from '../../hooks/useTheme';
/** Título y descripción de una sección con jerarquía tipográfica. */
export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 6 }}>
      <Text accessibilityRole="header" style={{ fontSize: 28, fontWeight: '800' }}>
        {title}
      </Text>
      {subtitle && <Text style={{ color: colors.muted, lineHeight: 23 }}>{subtitle}</Text>}
    </View>
  );
}
