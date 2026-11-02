import type { Role } from '../types/entities';
const shared = ['/', '/profile'];
const routes: Record<Role, string[]> = {
  client: [...shared, '/home', '/vehicles', '/services', '/appointments', '/booking'],
  employee: [...shared, '/agenda', '/history'],
  admin: [
    ...shared,
    '/dashboard',
    '/vehicles',
    '/services',
    '/appointments',
    '/booking',
    '/users',
    '/reports',
    '/settings',
  ],
};
/** Limita el retorno de arranque a pantallas internas permitidas para el rol actual.
 * @param destination Parámetro de la ruta pública de espera, tratado como no confiable.
 * @param role Rol confirmado por el backend después de restaurar.
 * @returns Destino interno validado o inicio; nunca una URL externa ni ruta de otro rol.
 */
export function restoreDestination(destination: unknown, role: Role) {
  if (typeof destination !== 'string') return '/';
  if (
    routes[role].includes(destination) ||
    /^\/appointment\/[1-9]\d{0,18}$/u.test(destination)
  )
    return destination;
  return '/';
}
