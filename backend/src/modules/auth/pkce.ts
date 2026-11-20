import { createHash, timingSafeEqual } from 'node:crypto';
import { AppError } from '../../errors/AppError.js';
/** Calcula el challenge S256 del verifier generado por el cliente.
 * @param verifier - Secreto PKCE generado por el dispositivo que inició el acceso.
 * @returns `string`.
 */
export function pkceChallenge(verifier: string) {
  return createHash('sha256').update(verifier).digest('base64url');
}
/** Rechaza códigos ajenos o vencidos sin revelar cuál de las condiciones falló.
 * @param challenge - Desafío S256 ligado al verifier que conserva el cliente.
 * @param verifier - Secreto PKCE generado por el dispositivo que inició el acceso.
 * @returns `void`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function assertGrantChallenge(challenge: string | undefined, verifier: string) {
  const actual = Buffer.from(pkceChallenge(verifier));
  const expected = Buffer.from(challenge ?? '');
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
    throw new AppError(
      401,
      'INVALID_OAUTH_CODE',
      'El acceso social venció o no corresponde a este dispositivo.',
    );
}
