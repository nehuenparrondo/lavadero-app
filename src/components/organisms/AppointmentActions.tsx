import { View } from 'react-native';
import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Button } from '../atoms/Button';
import { AppointmentAssignment } from './AppointmentAssignment';
import { AppointmentPaymentAction } from './AppointmentPaymentAction';
import { AppointmentStatusEditor } from './AppointmentStatusEditor';
import { EmployeeWorkAction } from './EmployeeWorkAction';
/** Acciones del rol visible; el servidor vuelve a validarlas con propiedad/asignación.
 * @param props - Propiedades tipadas: manager.
 * @returns Vista de AppointmentActions con el contrato de propiedades declarado.
 */
export function AppointmentActions({
  manager: m,
}: {
  manager: ReturnType<typeof useAppointmentDetail>;
}) {
  const appointment = m.detail.data;
  if (!appointment) return null;
  const closed = ['completed', 'cancelled'].includes(appointment.status);
  return (
    <View style={{ gap: 16 }}>
      {m.user?.role === 'admin' && !closed && <AppointmentAssignment m={m} />}
      {m.user?.role === 'admin' && <AppointmentStatusEditor m={m} />}
      {m.user?.role === 'employee' &&
        ['pending', 'confirmed', 'in_progress'].includes(appointment.status) && (
          <EmployeeWorkAction m={m} />
        )}
      {m.canCancel && !closed && (
        <Button
          label="Cancelar turno"
          variant="danger"
          onPress={() => m.setCancelOpen(true)}
        />
      )}
      {m.canPay && ['in_progress', 'completed'].includes(appointment.status) && (
        <AppointmentPaymentAction m={m} />
      )}
      {m.user?.role !== 'employee' && appointment.status === 'completed' && (
        <Button label="Ver comprobante" onPress={() => m.setReceiptOpen(true)} />
      )}
    </View>
  );
}
