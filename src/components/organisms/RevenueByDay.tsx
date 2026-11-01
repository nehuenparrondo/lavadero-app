import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Report } from '../../types/entities';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
/** Presenta revenue by day con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: report. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function RevenueByDay({ report }: { report: Report }) {
  const { colors } = useTheme();
  const max = Math.max(1, ...report.days.map((d) => d.revenueCents));
  return (
    <Card>
      <Text style={{ fontSize: 20, fontWeight: '800' }}>Ingresos por día</Text>
      {report.days.map((day) => (
        <View key={day.date} style={{ gap: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 13 }}>{day.date}</Text>
            <Text style={{ fontSize: 13 }}>{money(day.revenueCents)}</Text>
          </View>
          <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.soft }}>
            <View
              style={{
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.primary,
                width: `${(day.revenueCents / max) * 100}%`,
              }}
            />
          </View>
        </View>
      ))}
    </Card>
  );
}
