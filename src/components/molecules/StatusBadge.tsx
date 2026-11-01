import type { AppointmentStatus } from '../../types/entities';
import { Badge } from '../atoms/Badge';
/** Traducciones estables del flujo de trabajo. */
export const statusLabels: Record<AppointmentStatus, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  in_progress: 'En proceso',
  completed: 'Finalizado',
  cancelled: 'Cancelado',
};
/** Estado de turno con color y texto, sin depender solamente del color.
 * @param props - Propiedades tipadas: status. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <Badge
      label={statusLabels[status]}
      tone={
        status === 'completed'
          ? 'success'
          : status === 'cancelled'
            ? 'danger'
            : status === 'pending'
              ? 'warning'
              : 'primary'
      }
    />
  );
}
