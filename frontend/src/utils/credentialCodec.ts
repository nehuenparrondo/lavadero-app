import type { StoredCredential } from '../types/storedCredential';
/** Treinta días, igual que expires_at de sesiones_renovacion; el servidor puede revocar antes. */
export const credentialLifetime = 30 * 24 * 60 * 60 * 1000;

/** Valida persistencia propia o un token legado sin aceptar permisos desde disco.
 * @param value Contenido local potencialmente alterado o ausente.
 * @param now Reloj en milisegundos para comprobar vencimiento.
 * @returns Credencial vigente o null ante cierre, corrupción o expiración.
 */
export function decodeCredential(
  value: string | null,
  now = Date.now(),
): StoredCredential | null {
  if (!value) return null;
  if (/^[a-f0-9]{64}$/u.test(value))
    return { refreshToken: value, userId: null, expiresAt: null };
  try {
    const data: unknown = JSON.parse(value);
    if (!data || typeof data !== 'object') return null;
    const v = data as Record<string, unknown>;
    if (
      v.version !== 1 ||
      typeof v.refreshToken !== 'string' ||
      !/^[a-f0-9]{64}$/u.test(v.refreshToken) ||
      typeof v.userId !== 'string' ||
      !/^[1-9]\d*$/u.test(v.userId) ||
      typeof v.expiresAt !== 'number' ||
      !Number.isFinite(v.expiresAt) ||
      v.expiresAt <= now
    )
      return null;
    return { refreshToken: v.refreshToken, userId: v.userId, expiresAt: v.expiresAt };
  } catch {
    return null;
  }
}

/** Serializa solo refresh, titular y vencimiento; nunca access JWT, rol o contraseña.
 * @param refreshToken Credencial opaca emitida por la API.
 * @param userId Titular confirmado por el servidor.
 * @param now Inicio de persistencia en milisegundos.
 * @returns Sobre versionado válido localmente durante treinta días desde la rotación.
 */
export function encodeCredential(refreshToken: string, userId: string, now = Date.now()) {
  return JSON.stringify({
    version: 1,
    refreshToken,
    userId,
    expiresAt: now + credentialLifetime,
  });
}
