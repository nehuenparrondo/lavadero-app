import type { Role } from '../types/entities';
import type { NavigationItem } from '../types/navigation';
/** Un único catálogo alimenta el menú móvil y la barra lateral. */
export const roleNavigation: Record<Role, NavigationItem[]> = {
  client: [
    { label: 'Inicio', href: '/(client)/home', path: '/home', icon: 'home' },
    {
      label: 'Mis turnos',
      href: '/(client)/appointments',
      path: '/appointments',
      icon: 'calendar',
    },
    { label: 'Mis vehículos', href: '/(client)/vehicles', path: '/vehicles', icon: 'car' },
    { label: 'Servicios', href: '/(client)/services', path: '/services', icon: 'sparkles' },
    { label: 'Mi perfil', href: '/(client)/profile', path: '/profile', icon: 'user' },
  ],
  employee: [
    { label: 'Mi agenda', href: '/(employee)/agenda', path: '/agenda', icon: 'calendar' },
    { label: 'Historial', href: '/(employee)/history', path: '/history', icon: 'history' },
    { label: 'Mi perfil', href: '/(employee)/profile', path: '/profile', icon: 'user' },
  ],
  admin: [
    { label: 'Resumen', href: '/(admin)/dashboard', path: '/dashboard', icon: 'grid' },
    {
      label: 'Turnos',
      href: '/(admin)/appointments',
      path: '/appointments',
      icon: 'calendar',
    },
    { label: 'Vehículos', href: '/(admin)/vehicles', path: '/vehicles', icon: 'car' },
    { label: 'Usuarios', href: '/(admin)/users', path: '/users', icon: 'users' },
    {
      label: 'Servicios y precios',
      href: '/(admin)/services',
      path: '/services',
      icon: 'sparkles',
    },
    { label: 'Reportes', href: '/(admin)/reports', path: '/reports', icon: 'chart' },
    { label: 'Configuración', href: '/(admin)/settings', path: '/settings', icon: 'settings' },
    { label: 'Mi perfil', href: '/(admin)/profile', path: '/profile', icon: 'user' },
  ],
};
/** Etiquetas humanas para identificar la experiencia, sin exponer nombres internos de rol. */
export const roleLabels: Record<Role, string> = {
  client: 'Espacio del cliente',
  employee: 'Equipo de trabajo',
  admin: 'Administración',
};
