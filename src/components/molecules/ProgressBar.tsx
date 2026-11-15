import { View, type DimensionValue } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../atoms/Text';

/** Barra accesible para comparar importes o cantidades reales de una serie.
 * @param props Etiqueta, valor numérico, máximo y cifra legible con unidad.
 * @returns Barra proporcional; un valor cero permanece vacío.
 */
export function ProgressBar({
  label,
  value,
  max,
  detail,
}: {
  label: string;
  value: number;
  max: number;
  detail: string;
}) {
  const { colors } = useTheme();
  const width =
    `${Math.min(100, Math.max(0, (value / Math.max(1, max)) * 100))}%` as DimensionValue;
  return (
    <View style={{ gap: 9 }} accessibilityLabel={`${label}: ${detail}`}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <Text style={{ color: colors.muted, fontSize: 13 }}>{label}</Text>
        <Text style={{ fontWeight: '700', fontSize: 13 }}>{detail}</Text>
      </View>
      <View style={{ height: 9, borderRadius: 6, backgroundColor: colors.soft }}>
        <View style={{ height: 9, borderRadius: 6, backgroundColor: colors.primary, width }} />
      </View>
    </View>
  );
}
