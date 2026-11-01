import type { useAppointments } from '../../hooks/useAppointments';
import { Notice } from '../molecules/Notice';
import { SectionHeader } from '../molecules/SectionHeader';
import { AppointmentFilters } from './AppointmentFilters';
import { AppointmentList } from './AppointmentList';
import { AppointmentPagination } from './AppointmentPagination';
/** Filtros y resultados compartidos por agenda e historial del equipo.
 * @param props Recurso limitado al empleado; un fallo del resumen no oculta sus turnos.
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
        title={m.history ? 'Trabajos anteriores' : 'Tu agenda'}
        subtitle="Seleccioná una fecha para consultar tus asignaciones."
      />
      <AppointmentFilters manager={m} />
      <Notice error={m.summaryError} onRetry={m.refresh} />
      <AppointmentList m={m} />
      <AppointmentPagination manager={m} />
    </>
  );
}
