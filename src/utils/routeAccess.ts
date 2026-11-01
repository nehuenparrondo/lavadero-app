import type { RouteAccess } from '../constants/rootRoutes';
import type { User } from '../types/entities';
/** Resuelve guardas con el rol verificado; durante restauración solo deja rutas públicas.
 * @param access - Valor tipado de access utilizado por esta operación.
 * @param user - Perfil vigente; nunca incluye una contraseña legible.
 * @param restoring - Valor tipado de restoring utilizado por esta operación.
 * @returns `boolean`, según el contrato de la operación.
 */
export function hasRouteAccess(access: RouteAccess, user: User | null, restoring: boolean) {
  if (access === 'public') return true;
  if (restoring) return false;
  if (access === 'guest') return !user;
  if (access === 'authenticated') return Boolean(user);
  if (access === 'booking') return user?.role === 'client' || user?.role === 'admin';
  return user?.role === access;
}
