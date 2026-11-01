import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Report } from '../../types/entities';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { EmployeePerformance } from './EmployeePerformance';
import { PopularServices } from './PopularServices';
import { RevenueByDay } from './RevenueByDay';
/** Indicadores y barras de ingresos diarios a partir de datos reales.
 * @param props - Propiedades tipadas: report. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function ReportSummary({ report }: { report: Report }) {
  const { colors } = useTheme();
  return (
    <>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        <View style={{ flex: 1, minWidth: 150 }}>
          <Card>
            <Text>Lavados finalizados</Text>
            <Text style={{ fontWeight: '900', fontSize: 32 }}>{report.totalWashes}</Text>
          </Card>
        </View>
        <View style={{ flex: 1, minWidth: 150 }}>
          <Card>
            <Text>Ingresos registrados</Text>
            <Text style={{ fontWeight: '900', fontSize: 28, color: colors.primary }}>
              {money(report.revenueCents)}
            </Text>
          </Card>
        </View>
      </View>
      <RevenueByDay report={report} />
      <PopularServices report={report} />
      <EmployeePerformance report={report} />
    </>
  );
}
