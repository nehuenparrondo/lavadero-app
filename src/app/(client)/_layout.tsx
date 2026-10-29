import { RoleTabs } from '../../navigation/RoleTabs';
/** Cinco destinos del cliente, protegidos por el layout raíz. */
export default function ClientLayout() {
  return (
    <RoleTabs
      items={[
        { name: 'home', label: 'Inicio', icon: '⌂' },
        { name: 'appointments', label: 'Mis turnos', icon: '▦' },
        { name: 'vehicles', label: 'Vehículos', icon: '▱' },
        { name: 'services', label: 'Servicios', icon: '✧' },
        { name: 'profile', label: 'Perfil', icon: '◉' },
      ]}
    />
  );
}
