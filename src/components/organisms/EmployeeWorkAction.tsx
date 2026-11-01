import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Button } from '../atoms/Button';
/** Ofrece iniciar o finalizar el lavado según el estado del turno.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de EmployeeWorkAction con el contrato de propiedades declarado.
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
