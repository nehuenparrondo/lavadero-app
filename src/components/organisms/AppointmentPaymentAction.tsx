import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Button } from '../atoms/Button';
/** Ofrece registrar cobro solo con las capacidades vigentes.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentPaymentAction con el contrato de propiedades declarado.
 */
export function AppointmentPaymentAction({
  m,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
}) {
  return (
    <Button
      label="Registrar cobro"
      variant="secondary"
      onPress={() => m.setPaymentOpen(true)}
    />
  );
}
