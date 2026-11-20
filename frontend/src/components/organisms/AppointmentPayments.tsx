import { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
/** Muestra cobros registrados y saldo de la proyección autorizada.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentPayments con el contrato de propiedades declarado.
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
