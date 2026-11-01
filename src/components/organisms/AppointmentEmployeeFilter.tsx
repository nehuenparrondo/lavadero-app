import type { useAppointments } from '../../hooks/useAppointments';
import { FormField } from '../molecules/FormField';
/** Selector administrativo de empleado para restringir la consulta de turnos.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentEmployeeFilter con el contrato de propiedades declarado.
 */
export function AppointmentEmployeeFilter({ m }: { m: ReturnType<typeof useAppointments> }) {
  return (
    <FormField
      field={{
        name: 'employee',
        label: 'Empleado',
        kind: 'choice',
        options: [
          { value: '', label: 'Todos' },
          ...m.employees.map((u) => ({
            value: u.id,
            label: `${u.firstName} ${u.lastName}`,
          })),
        ],
      }}
      value={m.employeeId}
      onChange={m.setEmployeeId}
    />
  );
}
