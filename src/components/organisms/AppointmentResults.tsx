import { useRouter } from 'expo-router';
import type { useAppointments } from '../../hooks/useAppointments';
import { appointmentListTitle } from '../../utils/appointmentListTitle';
import { Button } from '../atoms/Button';
import { SectionHeader } from '../molecules/SectionHeader';
import { AppointmentFilters } from './AppointmentFilters';
import { AppointmentList } from './AppointmentList';
import { AppointmentPagination } from './AppointmentPagination';
/** Contenido de listado separado del ciclo de actualización de la pantalla.
 * @param props Recurso y filtros correspondientes al rol autenticado.
 * @returns Encabezado, filtros y lista paginada con acceso a una nueva reserva.
 */
export function AppointmentResults({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointments>;
}) {
  const router = useRouter();
  return (
    <>
      <SectionHeader
        title={appointmentListTitle(m.mode, m.history)}
        subtitle="El estado de cada lavado, actualizado."
      />
      {m.mode !== 'employee' && (
        <Button label="+ Reservar turno" onPress={() => router.push('/booking')} />
      )}
      <AppointmentFilters manager={m} />
      <AppointmentList m={m} />
      <AppointmentPagination manager={m} />
    </>
  );
}
