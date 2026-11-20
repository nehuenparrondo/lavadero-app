import type { Request } from 'express';
import type { z } from 'zod';
import { actor, paramId } from '../../utils/http.js';
import * as admin from './admin.service.js';
import type {
  adminPatchSchema,
  createUserSchema,
  passwordChangeSchema,
  profileSchema,
  roleSchema,
} from './users.schema.js';
import { usersQuerySchema } from './users.schema.js';
import * as service from './users.service.js';

/** Devuelve perfil de sesión.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<import("../../types/domain.js").User>`.
 */
export function me(r: Request) {
  return service.getProfile(actor(r).id);
}
/** Actualiza perfil propio.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<import("../../types/domain.js").User>`.
 */
export function editMe(r: Request) {
  return service.updateOwnProfile(actor(r), r.body as z.infer<typeof profileSchema>);
}
/** Actualiza contraseña propia.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ passwordChanged: boolean; requiresLogin: boolean; }>`.
 */
export function password(r: Request) {
  return service.changePassword(actor(r), r.body as z.infer<typeof passwordChangeSchema>);
}
/** Lista administrativa paginada.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ items: import("../../types/domain.js").User[]; total: number; page: number; limit: number; }>`.
 */
export function list(r: Request) {
  return service.listUsers(usersQuerySchema.parse(r.query));
}
/** Crea cuenta administrativa.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<import("../../types/domain.js").User>`.
 */
export function create(r: Request) {
  return service.createUser(r.body as z.infer<typeof createUserSchema>);
}
/** Consulta individual administrativa.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<import("../../types/domain.js").User>`.
 */
export function get(r: Request) {
  return service.getProfile(paramId(r));
}
/** Edita cuenta administrativa.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ updated: boolean; }>`.
 */
export function edit(r: Request) {
  return admin.editAccount(actor(r), paramId(r), r.body as z.infer<typeof adminPatchSchema>);
}
/** Cambia rol bajo guard transaccional.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<import("../../types/domain.js").User>`.
 */
export function role(r: Request) {
  return admin.changeRole(actor(r), paramId(r), (r.body as z.infer<typeof roleSchema>).role);
}
/** Borrado lógico administrativo.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns `Promise<{ updated: boolean; }>`.
 */
export function remove(r: Request) {
  return admin.editAccount(actor(r), paramId(r), {}, true);
}
