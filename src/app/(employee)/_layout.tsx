import { RoleTabs } from '../../navigation/RoleTabs';
/** Agenda, historial y perfil del empleado. */
export default function EmployeeLayout() {
  return (
    <RoleTabs
      items={[
        { name: 'agenda', label: 'Mi agenda', icon: '▦' },
        { name: 'history', label: 'Historial', icon: '≡' },
        { name: 'profile', label: 'Perfil', icon: '◉' },
      ]}
    />
  );
}
