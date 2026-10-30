import { useRouter } from 'expo-router';
import { Screen } from '../../components/organisms/Screen';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Button } from '../../components/atoms/Button';
import { Text } from '../../components/atoms/Text';
import { AppointmentCard } from '../../components/organisms/AppointmentCard';
import { AppointmentFilters } from '../../components/organisms/AppointmentFilters';
import { CollectionState } from '../../components/organisms/CollectionState';
import { Pagination } from '../../components/molecules/Pagination';
import { useAppointments } from '../../hooks/useAppointments';
/** Lista de turnos con filtros, estados y navegación a detalles. */
export function AppointmentsScreen({
  mode = 'client',
  history = false,
}: {
  mode?: 'client' | 'employee' | 'admin';
  history?: boolean;
}) {
  const m = useAppointments(mode, history);
  const router = useRouter();
  return (
    <Screen
      refreshing={m.loading}
      onRefresh={() => {
        void m.refresh();
      }}
    >
      <SectionHeader
        title={
          mode === 'employee'
            ? history
              ? 'Historial de trabajos'
              : 'Mi agenda'
            : mode === 'admin'
              ? 'Turnos'
              : 'Mis turnos'
        }
        subtitle="El estado de cada lavado, actualizado."
      />
      {mode !== 'employee' && (
        <Button label="+ Reservar turno" onPress={() => router.push('/booking')} />
      )}
      {m.summary && (
        <Text>
          Jornada: {m.summary.completed} finalizados · {m.summary.pending} pendientes
        </Text>
      )}
      <AppointmentFilters manager={m} />
      <CollectionState
        loading={m.loading}
        error={m.error}
        empty={!m.data?.items.length}
        emptyTitle="No hay turnos con estos filtros"
        onRetry={() => {
          void m.refresh();
        }}
      >
        {m.data?.items.map((a) => (
          <AppointmentCard
            key={a.id}
            appointment={a}
            onPress={() => router.push(`/appointment/${a.id}`)}
          />
        ))}
      </CollectionState>
      {m.data && (
        <Pagination
          page={m.page}
          total={m.data.total}
          limit={m.data.limit}
          onChange={m.setPage}
        />
      )}
    </Screen>
  );
}
