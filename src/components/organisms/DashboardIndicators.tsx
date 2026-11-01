import { useDashboard } from '../../hooks/useDashboard';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
/** Presenta dashboard indicators con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: report, pending. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function DashboardIndicators({
  report,
  pending,
}: {
  report: ReturnType<typeof useDashboard>['report'];
  pending: ReturnType<typeof useDashboard>['pending'];
}) {
  return (
    <Card>
      <Text>Lavados finalizados hoy</Text>
      <Text style={{ fontSize: 36, fontWeight: '900' }}>{report.data?.totalWashes ?? 0}</Text>
      <Text>Ingresos: {money(report.data?.revenueCents)}</Text>
      <Text>Reservas pendientes: {pending.data?.total ?? 0}</Text>
    </Card>
  );
}
