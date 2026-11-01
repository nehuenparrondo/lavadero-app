import { View } from 'react-native';
import { overviewStyles as s } from '../../theme/overview.styles';
import type { Report } from '../../types/entities';
import { money } from '../../utils/format';
import { MetricTile } from '../molecules/MetricTile';
import { EmployeePerformance } from './EmployeePerformance';
import { PopularServices } from './PopularServices';
import { RevenueByDay } from './RevenueByDay';
/** Compone indicadores, ingresos, servicios y rendimiento desde un único reporte.
 * @param props Reporte autorizado del período solicitado.
 * @returns Resumen contable y operativo, sin recalcular ni inferir cifras en la UI.
 */
export function ReportSummary({ report }: { report: Report }) {
  return (
    <>
      <View style={s.row}>
        <MetricTile
          label="Lavados finalizados"
          value={String(report.totalWashes)}
          detail="En el período seleccionado"
          icon="check"
        />
        <MetricTile
          label="Ingresos registrados"
          value={money(report.revenueCents)}
          detail="Cobros del período · ARS"
          icon="wallet"
        />
      </View>
      <RevenueByDay report={report} />
      <PopularServices report={report} />
      <EmployeePerformance report={report} />
    </>
  );
}
