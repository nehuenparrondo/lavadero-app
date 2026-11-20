import type { Role } from '../../types/domain.js';
import type { Executor } from '../../utils/db.js';
import { execute, rows } from '../../utils/db.js';
import type { Identity } from './users.types.js';

const fields = `SELECT CAST(u.id AS CHAR) id,u.email,u.password_hash passwordHash,r.code role,
 u.first_name firstName,u.last_name lastName,u.phone,u.avatar_url avatarUrl,
 u.auth_version authVersion,u.can_record_payments canRecordPayments,u.is_active isActive,u.deleted_at deletedAt
 FROM usuarios u JOIN roles r ON r.id=u.role_id`;
/** Obtiene identidad interna por ID, incluyendo estado lógico.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @param lock - Si es verdadero, bloquea la fila hasta el final de la transacción.
 * @returns `Promise<Identity | undefined>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function findUser(id: string, executor?: Executor, lock = false) {
  return (
    await rows<Identity>(
      fields + ' WHERE u.id=?' + (lock ? ' FOR UPDATE' : ''),
      [id],
      executor,
    )
  )[0];
}
/** Busca email normalizado para login o vinculación OAuth verificada.
 * @param email - Correo normalizado utilizado para localizar la identidad.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<Identity | undefined>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function findByEmail(email: string, executor?: Executor) {
  return (
    await rows<Identity>(fields + ' WHERE u.email=?', [email.toLowerCase()], executor)
  )[0];
}
/** Inserta una identidad; el servicio decide el rol autorizado.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @param hash - Hash del token; evita persistir su valor legible.
 * @param role - Rol permitido del catálogo de seguridad.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<string>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function insertUser(
  input: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string | null | undefined;
  },
  hash: string | null,
  role: Role,
  executor?: Executor,
) {
  const result = await execute(
    `INSERT INTO usuarios (role_id,email,password_hash,first_name,last_name,phone)
    SELECT id,?,?,?,?,? FROM roles WHERE code=?`,
    [
      input.email.toLowerCase(),
      hash,
      input.firstName,
      input.lastName,
      input.phone ?? null,
      role,
    ],
    executor,
  );
  return String(result.insertId);
}
/** Lista usuarios sin hashes con búsqueda y paginación; filtros son valores parametrizados.
 * @param search - Texto de búsqueda que se envía como parámetro SQL.
 * @param role - Rol permitido del catálogo de seguridad.
 * @param page - Número de página desde uno.
 * @param limit - Cantidad máxima de filas permitida por el esquema de paginación.
 * @returns `Promise<{ items: Identity[]; total: number; page: number; limit: number; }>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function listUsers(
  search: string,
  role: string | undefined,
  page: number,
  limit: number,
) {
  const term = `%${search}%`;
  const filter =
    " WHERE u.deleted_at IS NULL AND (u.email LIKE ? OR CONCAT(u.first_name,' ',u.last_name) LIKE ?) AND (? IS NULL OR r.code=?)";
  const values = [term, term, role ?? null, role ?? null];
  const items = await rows<Identity>(
    fields + filter + ' ORDER BY u.id DESC LIMIT ? OFFSET ?',
    [...values, limit, (page - 1) * limit],
  );
  const all = await rows<Identity>(
    'SELECT COUNT(*) total FROM usuarios u JOIN roles r ON r.id=u.role_id' + filter,
    values,
  );
  return { items, total: Number(all[0]?.total ?? 0), page, limit };
}
/** Actualiza únicamente campos de perfil permitidos.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<void>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function updateProfile(
  id: string,
  input: {
    firstName: string;
    lastName: string;
    phone: string | null;
    avatarUrl: string | null;
  },
  executor?: Executor,
) {
  await execute(
    'UPDATE usuarios SET first_name=?,last_name=?,phone=?,avatar_url=? WHERE id=?',
    [input.firstName, input.lastName, input.phone, input.avatarUrl, id],
    executor,
  );
}
/** Invalida permisos antiguos y todos los refresh de una cuenta.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<void>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function revokeUserSessions(id: string, executor: Executor) {
  await execute('UPDATE usuarios SET auth_version=auth_version+1 WHERE id=?', [id], executor);
  await execute(
    'UPDATE sesiones_renovacion SET revoked_at=COALESCE(revoked_at,UTC_TIMESTAMP(3)) WHERE user_id=?',
    [id],
    executor,
  );
}
