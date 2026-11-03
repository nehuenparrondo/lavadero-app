import { Button } from '../atoms/Button';
import type { useAppointments } from '../../hooks/useAppointments';
import { Notice } from '../molecules/Notice';
import { SectionHeader } from '../molecules/SectionHeader';
import { AppointmentFilters } from './AppointmentFilters';
import { AppointmentList } from './AppointmentList';
import { AppointmentPagination } from './AppointmentPagination';
/** Filtros y resultados compartidos por agenda e historial del equipo.
 * @param props Recurso operativo compartido por el equipo; un fallo del resumen no oculta sus turnos.
 * @returns Lista paginada con filtros y estados de red visibles.
 */
export function EmployeeAppointmentResults({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointments>;
}) {
  return (
    <>
      <SectionHeader
        title={m.history ? 'Trabajos anteriores' : 'Agenda del equipo'}
        subtitle="Seleccioná la fecha de la reserva o quitá el filtro para ver todos los turnos del equipo."
      />
      <AppointmentFilters manager={m} />
      <Button
        label="Actualizar agenda"
        variant="quiet"
        disabled={m.loading}
        onPress={() => {
          void m.refresh();
        }}
      />
      <Notice error={m.summaryError} onRetry={m.refresh} />
      <AppointmentList m={m} />
      <AppointmentPagination manager={m} />
    </>
  );
}
