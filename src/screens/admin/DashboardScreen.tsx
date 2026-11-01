import { useRouter } from 'expo-router';
import { Button } from '../../components/atoms/Button';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { DashboardIndicators } from '../../components/organisms/DashboardIndicators';
import { PendingAppointments } from '../../components/organisms/PendingAppointments';
import { Screen } from '../../components/organisms/Screen';
import { useDashboard } from '../../hooks/useDashboard';
/** Panel del administrador con pendientes reales y resumen del día.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function DashboardScreen() {
  const { user, report, pending, refresh } = useDashboard();
  const router = useRouter();
  return (
    <Screen refreshing={report.loading || pending.loading} onRefresh={refresh}>
      <SectionHeader
        title={`Buen día, ${user?.firstName ?? ''}`}
        subtitle="Así está el lavadero hoy."
      />
      <DashboardIndicators report={report} pending={pending} />
      <Button label="+ Reservar para un cliente" onPress={() => router.push('/booking')} />
      <Button
        label="Administrar vehículos"
        variant="secondary"
        onPress={() => router.push('/(admin)/vehicles')}
      />
      <Notice error={report.error || pending.error} />
      <SectionHeader title="Solicitudes pendientes" />
      <PendingAppointments items={pending.data?.items ?? []} loading={pending.loading} />
    </Screen>
  );
}
