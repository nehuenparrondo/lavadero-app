import { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { ContractServiceLines } from '../molecules/ContractServiceLines';
import { StatusBadge } from '../molecules/StatusBadge';
/** Presenta el contrato del lavado sin modificar la reserva.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentInformation con el contrato de propiedades declarado.
 */
export function AppointmentInformation({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  const a = m.detail.data;
  if (!a) return null;
  return (
    <Card>
      <StatusBadge status={a.status} />
      <Text>{[a.vehicleType, a.color, a.clientName].filter(Boolean).join(' · ')}</Text>
      {a.clientPhone && <Text>Contacto: {a.clientPhone}</Text>}
      <Text>Empleado asignado: {a.employeeName ?? 'Por asignar'}</Text>
      <ContractServiceLines items={a.services ?? []} showDuration />
      {a.totalCents !== undefined && (
        <>
          <Text style={{ fontWeight: '800', fontSize: 22 }}>Total: {money(a.totalCents)}</Text>
          <Text>
            Abonado: {money(a.paidCents)} · Saldo: {money(a.totalCents - (a.paidCents ?? 0))}
          </Text>
        </>
      )}
    </Card>
  );
}
