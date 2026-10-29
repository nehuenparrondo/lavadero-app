import { useRouter } from 'expo-router';
import { Screen } from '../../components/organisms/Screen';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Card } from '../../components/molecules/Card';
import { Button } from '../../components/atoms/Button';
import { Text } from '../../components/atoms/Text';
import { Notice } from '../../components/molecules/Notice';
import { AppointmentCard } from '../../components/organisms/AppointmentCard';
import { useRemoteData } from '../../hooks/useRemoteData';
import { useAuth } from '../../hooks/useAuth';
import type { Page, Appointment, Report } from '../../types/entities';
import { money } from '../../utils/format';
/** Panel del administrador con pendientes reales y resumen del día. */
export function DashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const report = useRemoteData<Report>('/reports', { period: 'day' });
  const pending = useRemoteData<Page<Appointment>>('/appointments', {
    status: 'pending',
    limit: 3,
  });
  return (
    <Screen
      refreshing={report.loading || pending.loading}
      onRefresh={() => {
        void report.refresh();
        void pending.refresh();
      }}
    >
      <SectionHeader
        title={`Buen día, ${user?.firstName ?? ''}`}
        subtitle="Así está el lavadero hoy."
      />
      <Card>
        <Text>Lavados finalizados hoy</Text>
        <Text style={{ fontSize: 36, fontWeight: '900' }}>
          {report.data?.totalWashes ?? 0}
        </Text>
        <Text>Ingresos: {money(report.data?.revenueCents)}</Text>
        <Text>Reservas pendientes: {pending.data?.total ?? 0}</Text>
      </Card>
      <Button label="+ Reservar para un cliente" onPress={() => router.push('/booking')} />
      <Button
        label="Administrar vehículos"
        variant="secondary"
        onPress={() => router.push('/(admin)/vehicles')}
      />
      <Notice error={report.error || pending.error} />
      <SectionHeader title="Solicitudes pendientes" />
      {pending.data?.items.map((a) => (
        <AppointmentCard
          key={a.id}
          appointment={a}
          onPress={() => router.push(`/appointment/${a.id}`)}
        />
      ))}
      {!pending.loading && !pending.data?.items.length && (
        <Text>No hay reservas esperando confirmación.</Text>
      )}
      <Button
        label="Ver todos los turnos"
        variant="secondary"
        onPress={() => router.push('/(admin)/appointments')}
      />
    </Screen>
  );
}
