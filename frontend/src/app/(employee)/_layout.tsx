import { RoleTabs } from '../../navigation/RoleTabs';
/** Agenda, historial y perfil del empleado.
 * @returns Vista de EmployeeLayout con el contrato de propiedades declarado.
 */
export default function EmployeeLayout() {
  return (
    <RoleTabs
      items={[
        { name: 'agenda', label: 'Mi agenda', icon: 'calendar' },
        { name: 'history', label: 'Historial', icon: 'history' },
        { name: 'profile', label: 'Perfil', icon: 'user' },
      ]}
    />
  );
}
