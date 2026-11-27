import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import { comparePassword, hashPassword } from '../../utils/password.js';
import { transaction } from '../../utils/transaction.js';
import { findByEmail, findUser, insertUser } from '../users/users.repository.js';
import type { loginSchema, registerSchema } from './auth.schema.js';
import { createSession } from './session.service.js';
import { signAccess } from './token.service.js';

/** Crea una cuenta Cliente y su sesión; el rol nunca se toma de la solicitud.
 * @param input Identidad y contraseña validadas por registerSchema; la contraseña se hashea antes de persistir.
 * @returns Perfil público, access JWT de 15 minutos y refresh opaco; nunca devuelve el hash de contraseña.
 * @remarks El alta y la sesión comparten transacción: un fallo no deja una cuenta creada parcialmente.
 */
export async function register(input: z.infer<typeof registerSchema>) {
  // Comprobar la firma antes del alta evita crear una cuenta que no pueda iniciar sesión.
  await signAccess({
    id: 'configuration-check',
    role: 'client',
    authVersion: 0,
    canRecordPayments: false,
  });
  const hash = await hashPassword(input.password);
  return transaction(async (connection) => {
    const id = await insertUser(input, hash, 'client', connection);
    const identity = await findUser(id, connection);
    if (!identity) throw new Error('No se pudo leer la cuenta creada.');
    return createSession(identity, connection);
  });
}
/** Autentica una cuenta local activa sin revelar cuál de las credenciales falló.
 * @param input Correo normalizado y contraseña validados por loginSchema; no se guardan en logs.
 * @returns Perfil público y sesión con access/refresh; conserva el rol vigente de la cuenta.
 * @throws AppError INVALID_CREDENTIALS para cuenta desconocida, social sin contraseña, inactiva o contraseña incorrecta.
 */
export async function login(input: z.infer<typeof loginSchema>) {
  const identity = await findByEmail(input.email);
  if (
    !identity?.passwordHash ||
    !identity.isActive ||
    identity.deletedAt ||
    !(await comparePassword(input.password, identity.passwordHash))
  ) {
    throw new AppError(401, 'INVALID_CREDENTIALS', 'Email o contraseña incorrectos.');
  }
  return createSession(identity);
}
