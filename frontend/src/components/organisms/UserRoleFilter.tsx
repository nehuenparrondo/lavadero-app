import { useUsers } from '../../hooks/useUsers';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
/** Filtra cuentas por rol sin modificar sus permisos.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de UserRoleFilter con el contrato de propiedades declarado.
 */
export function UserRoleFilter({ m }: { m: ReturnType<typeof useUsers> }) {
  return (
    <ChoiceGroup
      value={m.role}
      onChange={m.setRole}
      options={[
        { value: '', label: 'Todos' },
        { value: 'client', label: 'Clientes' },
        { value: 'employee', label: 'Empleados' },
        { value: 'admin', label: 'Administradores' },
      ]}
    />
  );
}
