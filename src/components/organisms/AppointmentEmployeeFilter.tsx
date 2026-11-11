import type { useAppointments } from '../../hooks/useAppointments';
import { SearchSelect } from '../molecules/SearchSelect';
/** Selector administrativo de empleado para restringir la consulta de turnos.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentEmployeeFilter con el contrato de propiedades declarado.
 */
export function AppointmentEmployeeFilter({ m }: { m: ReturnType<typeof useAppointments> }) {
  return (
    <SearchSelect
      label="Empleado"
      options={[
        { value: '', label: 'Todos' },
        ...m.employees.map((u) => ({
          value: u.id,
          label: `${u.firstName} ${u.lastName}`,
        })),
      ]}
      value={m.employeeId}
      onChange={m.setEmployeeId}
    />
  );
}
