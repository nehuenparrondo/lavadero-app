import { Badge } from '../atoms/Badge';
import type { AppointmentStatus } from '../../types/entities';
/** Traducciones estables del flujo de trabajo. */
export const statusLabels: Record<AppointmentStatus, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  in_progress: 'En proceso',
  completed: 'Finalizado',
  cancelled: 'Cancelado',
};
/** Estado de turno con color y texto, sin depender solamente del color. */
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
