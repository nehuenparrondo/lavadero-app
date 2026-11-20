import type { Role } from '../types/entities';
/** Selecciona la ruta protegida del perfil de la sesión actual.
 * @param role Rol verificado por el backend al iniciar o restaurar la sesión.
 * @returns Ruta explícita que evita ambigüedad entre grupos con el mismo nombre.
 */
export function profileDestination(role: Role) {
  return {
    client: '/(client)/profile',
    employee: '/(employee)/profile',
    admin: '/(admin)/profile',
  }[role] as '/(client)/profile' | '/(employee)/profile' | '/(admin)/profile';
}
