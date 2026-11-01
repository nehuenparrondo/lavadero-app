import type { useAppointments } from '../../hooks/useAppointments';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
import { statusLabels } from '../molecules/StatusBadge';
/** Presenta appointment status filter con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
