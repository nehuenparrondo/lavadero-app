import { useUsers } from '../../hooks/useUsers';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
/** Presenta user role filter con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
