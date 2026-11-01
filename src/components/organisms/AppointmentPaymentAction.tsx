import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Button } from '../atoms/Button';
/** Presenta appointment payment action con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
