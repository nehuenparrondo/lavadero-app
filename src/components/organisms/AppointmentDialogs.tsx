import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { AppointmentCancellationDialog } from './AppointmentCancellationDialog';
import { AppointmentPaymentDialog } from './AppointmentPaymentDialog';
import { AppointmentReceiptDialog } from './AppointmentReceiptDialog';
/** Confirmaciones, cobro y comprobante histórico sin exponer datos de otros turnos.
 * @param props - Propiedades tipadas: manager.
 * @returns Vista de AppointmentDialogs con el contrato de propiedades declarado.
 */
export function AppointmentDialogs({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointmentDetail>;
}) {
  return (
    <>
      <AppointmentCancellationDialog m={m} />
      <AppointmentPaymentDialog m={m} />
      <AppointmentReceiptDialog m={m} />
    </>
  );
}
