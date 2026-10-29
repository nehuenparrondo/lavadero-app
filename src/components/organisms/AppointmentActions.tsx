import { View } from 'react-native';
import { Button } from '../atoms/Button';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
import { Text } from '../atoms/Text';
import { statusLabels } from '../molecules/StatusBadge';
import { Card } from '../molecules/Card';
import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import type { AppointmentStatus } from '../../types/entities';
/** Acciones del rol visible; el servidor vuelve a validarlas con propiedad/asignación. */
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
      {m.user?.role === 'admin' && !closed && (
        <Card>
          <Text style={{ fontWeight: '700' }}>Empleado asignado</Text>
          <ChoiceGroup
            options={m.employees.map((e) => ({
              value: e.id,
              label: `${e.firstName} ${e.lastName}`,
            }))}
            value={m.employeeId}
            onChange={m.setEmployeeId}
          />
          <Button
            label={
              appointment.status === 'pending' ? 'Asignar y confirmar' : 'Guardar asignación'
            }
            disabled={!m.employeeId}
            loading={m.action.busy}
            onPress={() => {
              void m.assign();
            }}
          />
        </Card>
      )}
      {m.user?.role === 'admin' && (
        <Card>
          <Text style={{ fontWeight: '700' }}>Estado del turno</Text>
          <ChoiceGroup
            options={Object.entries(statusLabels).map(([value, label]) => ({ value, label }))}
            value={m.status}
            onChange={(v) => m.setStatus(v as AppointmentStatus)}
          />
          <Button
            label="Actualizar estado"
            disabled={m.status === appointment.status}
            loading={m.action.busy}
            onPress={() => {
              void m.setAdminStatus();
            }}
          />
        </Card>
      )}
      {m.user?.role === 'employee' &&
        ['confirmed', 'in_progress'].includes(appointment.status) && (
          <Button
            label={appointment.status === 'confirmed' ? 'Comenzar lavado' : 'Finalizar lavado'}
            loading={m.action.busy}
            onPress={() => {
              void m.advance();
            }}
          />
        )}
      {m.canCancel && !closed && (
        <Button
          label="Cancelar turno"
          variant="danger"
          onPress={() => m.setCancelOpen(true)}
        />
      )}
      {m.canPay && ['in_progress', 'completed'].includes(appointment.status) && (
        <Button
          label="Registrar cobro"
          variant="secondary"
          onPress={() => m.setPaymentOpen(true)}
        />
      )}
      {m.user?.role !== 'employee' && appointment.status === 'completed' && (
        <Button label="Ver comprobante" onPress={() => m.setReceiptOpen(true)} />
      )}
    </View>
  );
}
