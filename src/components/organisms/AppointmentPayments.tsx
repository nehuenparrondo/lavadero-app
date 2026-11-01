import { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
/** Presenta appointment payments con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function AppointmentPayments({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  return (
    <Card>
      <Text style={{ fontWeight: '700' }}>Pagos registrados</Text>
      {m.payments.data?.map((p) => (
        <Text key={p.id}>
          {money(p.amountCents)} · {p.method === 'cash' ? 'Efectivo' : 'Transferencia'}
        </Text>
      ))}
    </Card>
  );
}
