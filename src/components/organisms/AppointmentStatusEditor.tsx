import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Button } from '../atoms/Button';

/** Confirma reservas antiguas que quedaron pendientes antes de la confirmación automática.
 * @param props - Gestor del detalle y su acción de confirmación.
 * @returns Botón de confirmación administrativa.
 */
export function AppointmentStatusEditor({
  m,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
}) {
  return (
    <Button
      label="Confirmar turno"
      loading={m.action.busy}
      onPress={() => {
        void m.setAdminStatus();
      }}
    />
  );
}
