import { PageHeading } from '../../components/molecules/PageHeading';
import { EmployeeAppointmentResults } from '../../components/organisms/EmployeeAppointmentResults';
import { Screen } from '../../components/organisms/Screen';
import { useAppointments } from '../../hooks/useAppointments';
/** Mantiene la jornada de hoy separada de la búsqueda de otras fechas.
 * @param props history abre la consulta general por fecha/patente; no concede permisos adicionales.
 * @returns Pendientes de hoy sin selector de fecha, o historial consultable con sus filtros.
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
        title={history ? 'Mi historial' : 'Mi agenda'}
        detail={
          history
            ? 'Buscá por patente y consultá turnos de cualquier fecha.'
            : 'Los lavados pendientes de hoy, en un solo lugar.'
        }
      />
      <EmployeeAppointmentResults manager={m} />
    </Screen>
  );
}
