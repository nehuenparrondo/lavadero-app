import { PageHeading } from '../../components/molecules/PageHeading';
import { EmployeeAppointmentResults } from '../../components/organisms/EmployeeAppointmentResults';
import { EmployeeDaySummary } from '../../components/organisms/EmployeeDaySummary';
import { Screen } from '../../components/organisms/Screen';
import { useAppointments } from '../../hooks/useAppointments';
/** Experiencia del equipo separada de la pantalla de clientes y de administración.
 * @param props Abre historial o jornada; nunca modifica los permisos del recurso.
 * @returns Agenda con resumen real por fecha y ayuda contextual.
 */
export function EmployeeAgendaScreen({ history = false }: { history?: boolean }) {
  const m = useAppointments('employee', history);
  return (
    <Screen
      refreshing={m.loading}
      onRefresh={m.refresh}
      refreshInterval={15_000}
      onRevalidate={m.revalidate}
    >
      <PageHeading
        eyebrow={history ? 'Tu recorrido' : 'Equipo de trabajo'}
        title={history ? 'El trabajo bien hecho.' : 'Tu jornada, bien organizada.'}
        detail={
          history
            ? 'Consultá los trabajos anteriores del equipo y cada detalle registrado.'
            : 'Encontrá cada vehículo, consultá sus servicios y registrá tu trabajo.'
        }
      />
      {!history && m.date && !m.plate && <EmployeeDaySummary summary={m.summary} />}
      <EmployeeAppointmentResults manager={m} />
    </Screen>
  );
}
