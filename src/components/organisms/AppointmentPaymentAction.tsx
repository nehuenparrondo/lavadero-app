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
  const appointment = m.detail.data;
  if (
    !appointment ||
    appointment.totalCents === undefined ||
    (appointment.paidCents ?? 0) >= appointment.totalCents
  )
    return null;
  return (
    <Button
      label="Registrar cobro"
      variant="secondary"
      onPress={() => m.setPaymentOpen(true)}
    />
  );
}
