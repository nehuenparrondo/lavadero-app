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
        title="Turnos por atender"
        subtitle="Revisá los detalles y organizá las próximas visitas."
      />
      <PendingAppointments
        items={r.data?.items ?? []}
        loading={r.loading || Boolean(r.error)}
      />
    </>
  );
}
