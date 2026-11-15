import { View } from 'react-native';
import { overviewStyles as s } from '../../theme/overview.styles';
import type { Report } from '../../types/entities';
import { money } from '../../utils/format';
import { MetricTile } from '../molecules/MetricTile';
import { PopularServices } from './PopularServices';
import { RevenueByWeek } from './RevenueByWeek';
/** Compone indicadores, ingresos semanales y servicios desde un único reporte.
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
      <RevenueByWeek report={report} />
      <PopularServices report={report} />
    </>
  );
}
