import { View } from 'react-native';
import type { useDashboard } from '../../hooks/useDashboard';
import { overviewStyles as s } from '../../theme/overview.styles';
import { money } from '../../utils/format';
import { MetricTile } from '../molecules/MetricTile';
/** Métricas diarias y pendientes globales; un recurso no disponible muestra un guion.
 * @param props Resumen diario y página de pendientes, consultados independientemente.
 * @returns Tres indicadores sin tendencias inventadas ni ceros de reemplazo.
 */
export function DashboardIndicators({
  report,
  pending,
}: {
  report: ReturnType<typeof useDashboard>['report'];
  pending: ReturnType<typeof useDashboard>['pending'];
}) {
  return (
    <View style={s.row}>
      <MetricTile
        label="Lavados finalizados"
        value={report.data ? String(report.data.totalWashes) : '—'}
        detail="En la jornada de hoy"
        icon="check"
      />
      <MetricTile
        label="Ingresos registrados"
        value={report.data ? money(report.data.revenueCents) : '—'}
        detail="Cobros de hoy · pesos argentinos"
        icon="wallet"
      />
      <MetricTile
        label="Lavados pendientes"
        value={pending.data ? String(pending.data.total) : '—'}
        detail="Solicitudes todavía sin iniciar"
        icon="calendar"
      />
    </View>
  );
}
