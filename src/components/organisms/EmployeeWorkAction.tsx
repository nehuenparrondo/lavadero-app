import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Button } from '../atoms/Button';
/** Presenta employee work action con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function EmployeeWorkAction({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  const appointment = m.detail.data;
  if (!appointment) return null;
  return (
    <Button
      label={appointment.status === 'confirmed' ? 'Comenzar lavado' : 'Finalizar lavado'}
      loading={m.action.busy}
      onPress={() => {
        void m.advance();
      }}
    />
  );
}
