import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../atoms/Text';
/** Jerarquía de sección, separada de la portada principal de cada experiencia.
 * @param props Título obligatorio y explicación opcional del contenido inmediato.
 * @returns Encabezado semántico con descripción de contraste secundario.
 */
export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 7 }}>
      <Text
        accessibilityRole="header"
        style={{ fontSize: 23, fontWeight: '700', letterSpacing: -0.5 }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text style={{ color: colors.muted, lineHeight: 23, fontSize: 14 }}>{subtitle}</Text>
      )}
    </View>
  );
}
