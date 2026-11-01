import { useRouter } from 'expo-router';
import { Button } from '../../components/atoms/Button';
import { Text } from '../../components/atoms/Text';
import { Pagination } from '../../components/molecules/Pagination';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { AppointmentFilters } from '../../components/organisms/AppointmentFilters';
import { AppointmentList } from '../../components/organisms/AppointmentList';
import { Screen } from '../../components/organisms/Screen';
import { useAppointments } from '../../hooks/useAppointments';
import { appointmentListTitle } from '../../utils/appointmentListTitle';
/** Lista de turnos con filtros, estados y navegación a detalles.
 * @param props - Propiedades tipadas: mode, history. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
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
    <Screen refreshing={m.loading} onRefresh={m.refresh}>
      <SectionHeader
        title={appointmentListTitle(mode, history)}
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
      <AppointmentList m={m} />
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
