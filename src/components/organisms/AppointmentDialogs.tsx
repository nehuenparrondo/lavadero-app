import { ModalPanel } from './ModalPanel';
import { EntityForm } from './EntityForm';
import { Notice } from '../molecules/Notice';
import { Text } from '../atoms/Text';
import { money, appointmentDate } from '../../utils/format';
import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
/** Confirmaciones, cobro y comprobante histórico sin exponer datos de otros turnos. */
export function AppointmentDialogs({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointmentDetail>;
}) {
  const a = m.detail.data;
  return (
    <>
      <ModalPanel
        visible={m.cancelOpen}
        title="Cancelar turno"
        onClose={() => m.setCancelOpen(false)}
      >
        <Text>La cancelación liberará este horario.</Text>
        <Notice error={m.action.error} />
        <EntityForm
          fields={[
            { name: 'reason', label: 'Motivo (opcional)', required: false, maxLength: 500 },
          ]}
          onSubmit={m.cancel}
          busy={m.action.busy}
          submitLabel="Confirmar cancelación"
        />
      </ModalPanel>
      <ModalPanel
        visible={m.paymentOpen}
        title="Registrar cobro"
        onClose={() => m.setPaymentOpen(false)}
      >
        <Notice error={m.action.error} />
        <EntityForm
          key={a?.paidCents ?? 'payment'}
          fields={[
            { name: 'amount', label: 'Importe en pesos argentinos', kind: 'money' },
            {
              name: 'method',
              label: 'Medio de pago',
              kind: 'choice',
              options: [
                { value: 'cash', label: 'Efectivo' },
                { value: 'transfer', label: 'Transferencia' },
              ],
            },
            {
              name: 'reference',
              label: 'Referencia (opcional)',
              required: false,
              maxLength: 100,
            },
          ]}
          initialValues={{
            amount:
              a?.totalCents !== undefined
                ? String((a.totalCents - (a.paidCents ?? 0)) / 100)
                : '',
            method: 'cash',
          }}
          onSubmit={m.pay}
          busy={m.action.busy}
          submitLabel="Guardar cobro"
        />
      </ModalPanel>
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
            {m.receipt.data.services?.map((s) => (
              <Text key={s.serviceId}>
                {s.name} · {money(s.priceCents)}
              </Text>
            ))}
            <Text style={{ fontWeight: '800' }}>
              Total: {money(m.receipt.data.totalCents)}
            </Text>
            <Text>Abonado: {money(m.receipt.data.paidCents)}</Text>
            <Text style={{ fontSize: 12 }}>
              Comprobante de servicio. No es una factura fiscal.
            </Text>
          </>
        )}
      </ModalPanel>
    </>
  );
}
