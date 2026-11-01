import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { appointmentDate, money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { ContractServiceLines } from '../molecules/ContractServiceLines';
import { Notice } from '../molecules/Notice';
import { ModalPanel } from './ModalPanel';
/** Presenta el comprobante histórico; no constituye factura fiscal.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentReceiptDialog con el contrato de propiedades declarado.
 */
export function AppointmentReceiptDialog({
  m,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
}) {
  return (
    <ModalPanel
      visible={m.receiptOpen}
      title="Comprobante de lavado"
      onClose={() => m.setReceiptOpen(false)}
    >
      <Notice error={m.receipt.error} />
      {m.receipt.data && (
        <>
          <Text style={{ fontWeight: '800', fontSize: 22 }}>
            {m.receipt.data.receiptNumber}
          </Text>
          <Text>
            {appointmentDate(m.receipt.data.startsAt)} · {m.receipt.data.plate}
          </Text>
          <ContractServiceLines items={m.receipt.data.services ?? []} />
          <Text style={{ fontWeight: '800' }}>Total: {money(m.receipt.data.totalCents)}</Text>
          <Text>Abonado: {money(m.receipt.data.paidCents)}</Text>
          <Text style={{ fontSize: 12 }}>
            Comprobante de servicio. No es una factura fiscal.
          </Text>
        </>
      )}
    </ModalPanel>
  );
}
