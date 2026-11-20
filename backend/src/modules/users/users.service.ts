import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import { NotFoundError } from '../../errors/NotFoundError.js';
import type { Actor } from '../../types/domain.js';
import { comparePassword, hashPassword } from '../../utils/password.js';
import { transaction } from '../../utils/transaction.js';
import { setPassword } from './admin.repository.js';
import * as repository from './users.repository.js';
import type {
  createUserSchema,
  passwordChangeSchema,
  profileSchema,
  usersQuerySchema,
} from './users.schema.js';
import { publicUser } from './users.types.js';

/** Lee perfil por ID y exige que la cuenta exista.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns `Promise<import("../../types/domain.js").User>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function getProfile(id: string) {
  const user = await repository.findUser(id);
  if (!user || user.deletedAt) throw new NotFoundError();
  return publicUser(user);
}
/** Guarda solo perfil permitido, preservando campos omitidos.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<import("../../types/domain.js").User>`.
 */
export async function updateOwnProfile(current: Actor, input: z.infer<typeof profileSchema>) {
  const user = await getProfile(current.id);
  await repository.updateProfile(current.id, {
    firstName: input.firstName ?? user.firstName,
    lastName: input.lastName ?? user.lastName,
    phone: input.phone === undefined ? user.phone : input.phone,
    avatarUrl: user.avatarUrl,
  });
  return getProfile(current.id);
}
/** Alta administrativa con contraseña hasheada y rol previamente autorizado por ruta.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<import("../../types/domain.js").User>`.
 */
export async function createUser(input: z.infer<typeof createUserSchema>) {
  const id = await repository.insertUser(
    input,
    await hashPassword(input.password),
    input.role,
  );
  return getProfile(id);
}
/** Lista perfiles sin datos de autenticación.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<{ items: import("../../types/domain.js").User[]; total: number; page: number; limit: number; }>`.
 */
export async function listUsers(input: z.infer<typeof usersQuerySchema>) {
  const result = await repository.listUsers(input.search, input.role, input.page, input.limit);
  return { ...result, items: result.items.map(publicUser) };
}
/** Verifica contraseña actual y revoca sesiones anteriores al cambiarla.
 * @param current - Identidad o entidad actual usada para conservar sus invariantes.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<{ passwordChanged: boolean; requiresLogin: boolean; }>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function changePassword(
  current: Actor,
  input: z.infer<typeof passwordChangeSchema>,
) {
  const identity = await repository.findUser(current.id);
  if (
    !identity?.passwordHash ||
    !(await comparePassword(input.currentPassword, identity.passwordHash))
  )
    throw new AppError(
      400,
      'INVALID_PASSWORD',
      'La contraseña actual no es correcta o la cuenta usa acceso social.',
    );
  const hash = await hashPassword(input.newPassword);
  await transaction(async (connection) => {
    await setPassword(current.id, hash, connection);
    await repository.revokeUserSessions(current.id, connection);
  });
  return { passwordChanged: true, requiresLogin: true };
}
