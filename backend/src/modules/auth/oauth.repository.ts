import type { RowDataPacket } from 'mysql2/promise';
import type { Executor } from '../../utils/db.js';
import { execute, rows } from '../../utils/db.js';
import type { OAuthState, Provider } from './oauth.types.js';
/** Persiste estado opaco con vencimiento corto.
 * @param hash - Hash del token; evita persistir su valor legible.
 * @param v - Datos tipados del elemento o formulario que se transforma.
 * @returns `Promise<void>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function saveState(
  hash: Buffer,
  v: {
    provider: Provider;
    clientState: string;
    redirectUri: string;
    clientChallenge: string;
    providerVerifier: string;
  },
) {
  await execute('DELETE FROM estados_oauth WHERE expires_at<UTC_TIMESTAMP(3)');
  await execute(
    `INSERT INTO estados_oauth(state_hash,provider,client_state,redirect_uri,client_challenge,provider_verifier,expires_at)
 VALUES(?,?,?,?,?,?,DATE_ADD(UTC_TIMESTAMP(3),INTERVAL 10 MINUTE))`,
    [hash, v.provider, v.clientState, v.redirectUri, v.clientChallenge, v.providerVerifier],
  );
}
/** Bloquea/consume estado una vez antes de contactar al proveedor.
 * @param hash - Hash del token; evita persistir su valor legible.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<OAuthState | undefined>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function takeState(hash: Buffer, executor: Executor) {
  const state = (
    await rows<OAuthState>(
      `SELECT provider,client_state clientState,redirect_uri redirectUri,client_challenge clientChallenge,
 provider_verifier providerVerifier FROM estados_oauth WHERE state_hash=? AND expires_at>UTC_TIMESTAMP(3) FOR UPDATE`,
      [hash],
      executor,
    )
  )[0];
  if (state) await execute('DELETE FROM estados_oauth WHERE state_hash=?', [hash], executor);
  return state;
}
/** Busca identidad externa por sujeto estable del proveedor.
 * @param provider - Proveedor permitido: Google, Discord o GitHub.
 * @param subject - Identificador estable del usuario dentro del proveedor social.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<RowDataPacket | undefined>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export async function findSocial(provider: Provider, subject: string, executor: Executor) {
  return (
    await rows<RowDataPacket>(
      'SELECT CAST(user_id AS CHAR) userId FROM cuentas_sociales WHERE provider=? AND provider_subject=?',
      [provider, subject],
      executor,
    )
  )[0];
}
/** Vincula email verificado a la identidad ya existente.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @param provider - Proveedor permitido: Google, Discord o GitHub.
 * @param subject - Identificador estable del usuario dentro del proveedor social.
 * @param executor - Ejecutor SQL; permite participar en la transacción del llamador.
 * @returns `Promise<import("mysql2/promise").ResultSetHeader>`.
 * @throws Error - Si falla la persistencia o el servicio remoto; se conserva el manejo central de errores.
 */
export function linkSocial(
  id: string,
  provider: Provider,
  subject: string,
  executor: Executor,
) {
  return execute(
    'INSERT INTO cuentas_sociales(user_id,provider,provider_subject) VALUES(?,?,?)',
    [id, provider, subject],
    executor,
  );
}
