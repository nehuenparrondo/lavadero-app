import { Notice } from '../../components/molecules/Notice';
import { OverviewColumns } from '../../components/molecules/OverviewColumns';
import { AdminQuickActions } from '../../components/organisms/AdminQuickActions';
import { AdminQueueLinks } from '../../components/organisms/AdminQueueLinks';
import { DashboardHeading } from '../../components/organisms/DashboardHeading';
import { DashboardIndicators } from '../../components/organisms/DashboardIndicators';
import { DashboardPending } from '../../components/organisms/DashboardPending';
import { Screen } from '../../components/organisms/Screen';
import { WeeklyActivity } from '../../components/organisms/WeeklyActivity';
import { useDashboard } from '../../hooks/useDashboard';
/** Compone el tablero sin consultas, navegación ni cálculos contables dentro del JSX.
 * @returns Resumen diario, solicitudes globales y actividad de la semana actual.
 */
export function DashboardScreen() {
  const d = useDashboard();
  return (
    <Screen
      refreshing={d.report.loading || d.pending.loading || d.week.loading}
      onRefresh={d.refresh}
      refreshInterval={15_000}
      onRevalidate={d.revalidate}
    >
      <DashboardHeading />
      <DashboardIndicators report={d.report} pending={d.pending} />
      <AdminQueueLinks pending={d.pending.data?.total} />
      <Notice error={d.report.error || d.pending.error} onRetry={d.refresh} />
      <OverviewColumns
        primary={<DashboardPending resource={d.pending} />}
        secondary={<WeeklyActivity resource={d.week} />}
      />
      <AdminQuickActions />
    </Screen>
  );
}
