import type { useAppointments } from '../../hooks/useAppointments';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
import { statusLabels } from '../molecules/StatusBadge';
/** Filtra la consulta por estado sin cambiar ningún turno.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentStatusFilter con el contrato de propiedades declarado.
 */
export function AppointmentStatusFilter({ m }: { m: ReturnType<typeof useAppointments> }) {
  return (
    <ChoiceGroup
      value={m.status}
      onChange={m.setStatus}
      options={[
        { value: '', label: 'Todos' },
        ...Object.entries(statusLabels).map(([value, label]) => ({ value, label })),
      ]}
    />
  );
}
