import { createHmac, hkdfSync } from 'node:crypto';
import { authEnv } from '../../config/authEnv.js';
import type { RecoveryJob } from './recovery.types.js';
/** Reconstruye el mismo secreto en los reintentos sin guardar el enlace en la base.
 * @param job - ID y nonce aleatorio de 256 bits; ambos pertenecen al trabajo privado.
 * @returns Token de 256 bits derivado con una clave separada de la firma JWT.
 */
export function recoveryToken(job: Pick<RecoveryJob, 'id' | 'nonce'>) {
  if (!authEnv.JWT_ACCESS_SECRET) throw new Error('RECOVERY_KEY_MISSING');
  const key = hkdfSync(
    'sha256',
    authEnv.JWT_ACCESS_SECRET,
    '',
    'lavadero/password-recovery/v1',
    32,
  );
  return createHmac('sha256', Buffer.from(key)).update(job.id).update(job.nonce).digest('hex');
}
