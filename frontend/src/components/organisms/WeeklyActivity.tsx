import type { useDashboard } from '../../hooks/useDashboard';
import { Notice } from '../molecules/Notice';
import { Text } from '../atoms/Text';
import { RevenueByWeek } from './RevenueByWeek';
import { PopularServices } from './PopularServices';
/** Muestra semanas del mes y demanda de servicios con actualización automática.
 * @param props Recurso contable del mes actual.
 * @returns Gráficos de barras y estado de consulta.
 */
export function WeeklyActivity({
  resource: r,
}: {
  resource: ReturnType<typeof useDashboard>['week'];
}) {
  return (
    <>
      <Notice error={r.error} onRetry={r.refresh} />
      {r.loading && !r.data && <Text>Consultando actividad…</Text>}
      {r.data && (
        <>
          <RevenueByWeek report={r.data} />
          <PopularServices report={r.data} />
        </>
      )}
    </>
  );
}
