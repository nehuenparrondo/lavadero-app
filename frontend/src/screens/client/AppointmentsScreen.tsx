import { AppointmentResults } from '../../components/organisms/AppointmentResults';
import { Screen } from '../../components/organisms/Screen';
import { useAppointments } from '../../hooks/useAppointments';
/** Lista de turnos con filtros, estados y navegación a detalles.
 * @param props - Propiedades tipadas: mode, history.
 * @returns Vista de AppointmentsScreen con el contrato de propiedades declarado.
 */
export function AppointmentsScreen({
  mode = 'client',
  history = false,
}: {
  mode?: 'client' | 'employee' | 'admin';
  history?: boolean;
}) {
  const m = useAppointments(mode, history);
  return (
    <Screen
      refreshing={m.loading}
      onRefresh={m.refresh}
      refreshInterval={15_000}
      onRevalidate={m.revalidate}
    >
      <AppointmentResults manager={m} />
    </Screen>
  );
}
