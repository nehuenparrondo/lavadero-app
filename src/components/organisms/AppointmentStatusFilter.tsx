import type { useAppointments } from '../../hooks/useAppointments';
import { SearchSelect } from '../molecules/SearchSelect';
import { statusLabels } from '../molecules/StatusBadge';
/** Filtra la consulta por estado sin cambiar ningún turno.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentStatusFilter con el contrato de propiedades declarado.
 */
export function AppointmentStatusFilter({ m }: { m: ReturnType<typeof useAppointments> }) {
  return (
    <SearchSelect
      label="Estado"
      value={m.status}
      onChange={m.setStatus}
      options={[
        { value: '', label: 'Todos' },
        ...Object.entries(statusLabels).map(([value, label]) => ({ value, label })),
      ]}
    />
  );
}
