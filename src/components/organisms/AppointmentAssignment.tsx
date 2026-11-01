import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
/** Presenta appointment assignment con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function AppointmentAssignment({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  const appointment = m.detail.data;
  if (!appointment) return null;
  return (
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
        label={appointment.status === 'pending' ? 'Asignar y confirmar' : 'Guardar asignación'}
        disabled={!m.employeeId}
        loading={m.action.busy}
        onPress={() => {
          void m.assign();
        }}
      />
    </Card>
  );
}
