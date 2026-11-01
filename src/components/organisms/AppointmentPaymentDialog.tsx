import { paymentFields } from '../../constants/paymentFields';
import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Presenta appointment payment dialog con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function AppointmentPaymentDialog({
  m,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
}) {
  const a = m.detail.data;
  return (
    <ModalPanel
      visible={m.paymentOpen}
      title="Registrar cobro"
      onClose={() => m.setPaymentOpen(false)}
    >
      <Notice error={m.action.error} />
      <EntityForm
        key={a?.paidCents ?? 'payment'}
        fields={paymentFields}
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
  );
}
