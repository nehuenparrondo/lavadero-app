import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../atoms/Text';
/** Título y descripción de una sección con jerarquía tipográfica.
 * @param props - Propiedades tipadas: title, subtitle. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
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
