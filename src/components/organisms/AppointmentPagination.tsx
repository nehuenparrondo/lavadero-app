import type { useAppointments } from '../../hooks/useAppointments';
import { Pagination } from '../molecules/Pagination';
/** Adapta la paginación del recurso sin repetirla entre experiencias.
 * @param props Administrador de consulta y página actual.
 * @returns Controles cuando existe respuesta; omite contenido mientras no hay datos.
 */
export function AppointmentPagination({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointments>;
}) {
  return m.data ? (
    <Pagination page={m.page} total={m.data.total} limit={m.data.limit} onChange={m.setPage} />
  ) : null;
}
