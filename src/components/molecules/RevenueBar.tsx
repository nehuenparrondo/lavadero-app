import type { DimensionValue } from 'react-native';
import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
/** Barra con cifra explícita para no depender de color o longitud.
 * @param props Día ISO, centavos registrados y máximo positivo de la serie.
 * @returns Fecha y monto legibles; un cero produce una barra vacía.
 */
export function RevenueBar({
  date,
  cents,
  max,
}: {
  date: string;
  cents: number;
  max: number;
}) {
  const { colors } = useTheme();
  const width = ((cents / max) * 100 + '%') as DimensionValue;
  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
        <Text style={{ fontSize: 12, color: colors.muted }}>
          {date.slice(8) + '/' + date.slice(5, 7)}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: '600' }}>{money(cents)}</Text>
      </View>
      <View style={{ height: 7, borderRadius: 4, backgroundColor: colors.soft }}>
        <View style={{ height: 7, borderRadius: 4, backgroundColor: colors.primary, width }} />
      </View>
    </View>
  );
}
