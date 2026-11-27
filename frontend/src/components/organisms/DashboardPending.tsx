import type { useDashboard } from '../../hooks/useDashboard';
import { SectionHeader } from '../molecules/SectionHeader';
import { PendingAppointments } from './PendingAppointments';
/** Turnos por atender del negocio; un fallo de consulta no se anuncia como lista vacía.
 * @param props Recurso paginado de pendientes.
 * @returns Encabezado y resultados con enlace a la gestión completa.
 */
export function DashboardPending({
  resource: r,
}: {
  resource: ReturnType<typeof useDashboard>['pending'];
}) {
  return (
    <>
      <SectionHeader
        title="Lavados pendientes"
        subtitle="Hoy y próximos días. Las nuevas solicitudes aparecen primero."
      />
      <PendingAppointments
        items={r.data?.items ?? []}
        loading={r.loading || Boolean(r.error)}
      />
    </>
  );
}
