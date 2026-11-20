import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from './Text';
/** Etiqueta compacta con tono semántico.
 * @param props - Propiedades tipadas: label, tone.
 * @returns Vista de Badge con el contrato de propiedades declarado.
 */
export function Badge({
  label,
  tone = 'primary',
}: {
  label: string;
  tone?: 'primary' | 'success' | 'danger' | 'warning';
}) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        backgroundColor: tone === 'danger' ? colors.dangerSoft : colors.soft,
        borderWidth: 1,
        borderColor: colors[tone] + '30',
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: '700', color: colors[tone] }}>{label}</Text>
    </View>
  );
}
