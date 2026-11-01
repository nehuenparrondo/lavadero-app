import { RoleTabs } from '../../navigation/RoleTabs';
/** Agenda, historial y perfil del empleado.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
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
