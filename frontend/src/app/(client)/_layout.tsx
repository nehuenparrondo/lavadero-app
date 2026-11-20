import { RoleTabs } from '../../navigation/RoleTabs';
/** Cinco destinos del cliente, protegidos por el layout raíz.
 * @returns Vista de ClientLayout con el contrato de propiedades declarado.
 */
export default function ClientLayout() {
  return (
    <RoleTabs
      items={[
        { name: 'home', label: 'Inicio', icon: 'home' },
        { name: 'appointments', label: 'Mis turnos', icon: 'calendar' },
        { name: 'vehicles', label: 'Vehículos', icon: 'car' },
        { name: 'services', label: 'Servicios', icon: 'sparkles' },
        { name: 'profile', label: 'Perfil', icon: 'user' },
      ]}
    />
  );
}
