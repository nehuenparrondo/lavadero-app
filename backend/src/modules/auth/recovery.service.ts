import { recoveryConfigured } from '../../config/recovery.js';
import { AppError } from '../../errors/AppError.js';
import { hashPassword } from '../../utils/password.js';
import { recoveryExpired } from './recovery.time.js';
import { transaction } from '../../utils/transaction.js';
import { setPassword } from '../users/admin.repository.js';
import { findUser, revokeUserSessions } from '../users/users.repository.js';
import { enqueueRecovery } from './recovery.queue.repository.js';
import { findRecovery, consumeRecovery } from './recovery.repository.js';
import { tokenHash } from './token.service.js';
/** Respuesta idéntica para correos conocidos, desconocidos o limitados; no hace lookup de cuentas.
 * @param email - Correo validado por el esquema estricto.
 * @returns Mensaje público genérico y canal de demostración.
 */
export async function requestRecovery(email: string) {
  if (!recoveryConfigured())
    throw new AppError(
      503,
      'RECOVERY_UNAVAILABLE',
      'La recuperación no está disponible. Intentá más tarde.',
    );
  await enqueueRecovery(email);
  return {
    message:
      'Si el correo corresponde a una cuenta activa, recibirás un enlace de recuperación.',
    delivery: 'sandbox',
  };
}
/** Consume el enlace una vez, cambia bcrypt y revoca JWT/refresh anteriores en la misma transacción.
 * @param input - Token opaco y nueva contraseña; nunca se registran en logs.
 * @returns Confirmación que exige volver a iniciar sesión.
 */
export async function resetPassword(input: { token: string; newPassword: string }) {
  const hash = tokenHash(input.token);
  const candidate = await findRecovery(hash);
  if (!candidate?.userId) throw invalidLink();
  const password = await hashPassword(input.newPassword);
  await transaction(async (connection) => {
    const user = await findUser(candidate.userId!, connection, true);
    const job = await findRecovery(hash, connection, true);
    if (
      !user?.isActive ||
      user.deletedAt ||
      !job ||
      !['enviado', 'procesando'].includes(job.status) ||
      !job.expiresAt ||
      recoveryExpired(job.expiresAt) ||
      user.authVersion !== job.authVersion ||
      user.email !== job.email
    )
      throw invalidLink();
    await setPassword(user.id, password, connection);
    await revokeUserSessions(user.id, connection);
    await consumeRecovery(job, connection);
  });
  return { passwordChanged: true, requiresLogin: true };
}
/** Mantiene el mismo error ante token vencido, usado, desconocido o cuenta no habilitada. */
function invalidLink() {
  return new AppError(
    400,
    'INVALID_RESET_LINK',
    'El enlace venció o ya fue usado. Solicitá uno nuevo.',
  );
}
