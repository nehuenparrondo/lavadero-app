import { recoveryEnv } from '../../config/recovery.js';
import { recoveryExpired } from './recovery.time.js';
import { transaction } from '../../utils/transaction.js';
import { findByEmail, findUser } from '../users/users.repository.js';
import * as repo from './recovery.repository.js';
import { claimRecovery, finishDelivery } from './recovery.queue.repository.js';
import { recoveryToken } from './recovery.token.js';
import type { RecoveryJob, RecoverySender } from './recovery.types.js';
import { sendRecoveryMail } from './recovery.mailtrap.js';
import { tokenHash } from './token.service.js';
/** Valida la cuenta fuera del request público y prepara un secreto de un único uso. */
async function prepare(job: RecoveryJob) {
  const identity = await findByEmail(job.email);
  if (!identity) {
    await repo.discardRecovery(job.id);
    return false;
  }
  return transaction(async (connection) => {
    const user = await findUser(identity.id, connection, true);
    const current = await repo.lockRecovery(job.id, connection);
    if (!current || current.status !== 'procesando') return false;
    if (
      !user?.isActive ||
      user.deletedAt ||
      user.email !== job.email ||
      (current.expiresAt && recoveryExpired(current.expiresAt)) ||
      (current.authVersion !== null && current.authVersion !== user.authVersion)
    ) {
      await repo.discardRecovery(job.id, connection);
      return false;
    }
    await repo.prepareRecovery(
      current,
      user.id,
      user.authVersion,
      tokenHash(recoveryToken(job)),
      connection,
    );
    return true;
  });
}
/** Procesa un correo pendiente. Los fallos no se exponen al request ni se imprimen.
 * @param send - Transporte sustituible únicamente en pruebas del módulo.
 * @returns Verdadero si se reclamó un trabajo, aunque fuera descartado.
 */
export async function dispatchRecovery(send: RecoverySender = sendRecoveryMail) {
  const job = await claimRecovery();
  if (!job) return false;
  try {
    if (!(await prepare(job))) return true;
    const url = new URL(recoveryEnv.PASSWORD_RESET_URL!);
    url.hash = new URLSearchParams({ token: recoveryToken(job) }).toString();
    await send(job.email, url.toString());
    await finishDelivery(job.id, true);
  } catch {
    await finishDelivery(job.id, false);
  }
  return true;
}
