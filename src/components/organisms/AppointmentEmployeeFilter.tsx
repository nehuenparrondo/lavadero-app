import type { useAppointments } from '../../hooks/useAppointments';
import { FormField } from '../molecules/FormField';
/** Presenta appointment employee filter con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
