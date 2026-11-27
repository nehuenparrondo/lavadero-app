import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
/** Asigna un empleado activo sin mezclar esa acción con confirmar el turno.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentAssignment con el contrato de propiedades declarado.
 */
export function AppointmentAssignment({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  const appointment = m.detail.data;
  if (!appointment) return null;
  return (
    <Card>
      <Text style={{ fontWeight: '700' }}>Empleado responsable</Text>
      <Text accessibilityLiveRegion="polite">
        Responsable actual: {appointment.employeeName ?? 'Sin asignar'}
      </Text>
      <AssignmentChoices m={m} />
      <Button
        label="Guardar responsable"
        disabled={!m.employees.some((employee) => employee.id === m.employeeId)}
        loading={m.action.busy}
        onPress={() => {
          void m.assign();
        }}
      />
    </Card>
  );
}

/** Mantiene la misma selección y confirmación para todos los empleados activos. */
function AssignmentChoices({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  return (
    <ChoiceGroup
      options={m.employees.map((employee) => ({
        value: employee.id,
        label: `${employee.firstName} ${employee.lastName}`,
      }))}
      value={m.employeeId}
      onChange={m.setEmployeeId}
    />
  );
}
