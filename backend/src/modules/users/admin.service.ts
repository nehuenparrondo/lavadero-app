import type { z } from 'zod';
import { ConflictError } from '../../errors/ConflictError.js';
import { ForbiddenError } from '../../errors/ForbiddenError.js';
import { NotFoundError } from '../../errors/NotFoundError.js';
import type { Actor, Role } from '../../types/domain.js';
import { transaction } from '../../utils/transaction.js';
import * as guard from './admin.repository.js';
import * as repository from './users.repository.js';
import type { adminPatchSchema } from './users.schema.js';
import type { Identity } from './users.types.js';
import { publicUser } from './users.types.js';

/** Impide autoexclusión y pérdida del último admin bajo lock común.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param role - Rol permitido del catálogo de seguridad.
 * @returns `Promise<import("../../types/domain.js").User>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function changeRole(current: Actor, id: string, role: Role) {
  return transaction(async (connection) => {
    await guard.lockAdminGuard(connection);
    const user = await repository.findUser(id, connection);
    if (!user || user.deletedAt) throw new NotFoundError();
    if (id === current.id && role !== 'admin')
      throw new ForbiddenError('No podés quitarte tu rol de administrador.');
    if (
      user.role === 'admin' &&
      role !== 'admin' &&
      user.isActive &&
      (await guard.countActiveAdmins(connection)) <= 1
    )
      throw new ConflictError('Debe quedar al menos un administrador activo.');
    await guard.setRole(id, role, connection);
    await repository.revokeUserSessions(id, connection);
    return publicUser((await repository.findUser(id, connection))!);
  });
}
/** Edita/desactiva o elimina lógicamente preservando invariantes administrativas.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @param deleted - Solicita baja lógica además de desactivar la cuenta.
 * @returns `Promise<{ updated: boolean; }>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function editAccount(
  current: Actor,
  id: string,
  input: z.infer<typeof adminPatchSchema>,
  deleted = false,
) {
  return transaction(async (connection) => {
    await guard.lockAdminGuard(connection);
    const user = await repository.findUser(id, connection);
    if (!user || user.deletedAt) throw new NotFoundError();
    const active = deleted ? false : (input.isActive ?? Boolean(user.isActive));
    if (id === current.id && !active)
      throw new ForbiddenError('No podés desactivarte ni eliminarte.');
    if (
      user.role === 'admin' &&
      user.isActive &&
      !active &&
      (await guard.countActiveAdmins(connection)) <= 1
    )
      throw new ConflictError('Debe quedar al menos un administrador activo.');
    await repository.updateProfile(id, mergedProfile(user, input), connection);
    await guard.setAccount(
      id,
      input.email ?? user.email,
      active,
      input.canRecordPayments ?? Boolean(user.canRecordPayments),
      deleted,
      connection,
    );
    await repository.revokeUserSessions(id, connection);
    return { updated: true };
  });
}

/** Combina solo campos de perfil permitidos; undefined conserva el valor anterior. */
function mergedProfile(user: Identity, input: z.infer<typeof adminPatchSchema>) {
  return {
    firstName: input.firstName ?? user.firstName,
    lastName: input.lastName ?? user.lastName,
    phone: input.phone === undefined ? user.phone : input.phone,
    avatarUrl: user.avatarUrl,
  };
}
