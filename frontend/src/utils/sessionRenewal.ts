import type { Session } from '../types/entities';
import type { StoredCredential } from '../types/storedCredential';
/** Dependencias inyectables: permite probar carreras, desconexión y rotación sin ejecutar React. */
export interface SessionRenewalDependencies {
  read: () => Promise<StoredCredential | null>;
  save: (session: Session) => Promise<void>;
  remove: () => Promise<void>;
  exchange: (token: string) => Promise<Session>;
  exclusive: <T>(operation: () => Promise<T>) => Promise<T>;
  rejected: (error: unknown) => boolean;
}

/** Comparte renovaciones simultáneas y siempre persiste el sucesor, incluso si una vista se desmontó.
 * @param deps Almacenamiento, bloqueo y transporte del entorno actual.
 * @returns Renovador compartido; conserva credenciales ante red/5xx y borra solo un rechazo definitivo vigente.
 */
export function createSessionRenewal(deps: SessionRenewalDependencies) {
  let pending: Promise<Session | null> | null = null;
  return (): Promise<Session | null> => {
    pending ??= deps
      .exclusive(() => exchangeStored(deps))
      .finally(() => {
        pending = null;
      });
    return pending;
  };
}

/** Usa la credencial más reciente dentro del bloqueo; no resucita una sesión borrada durante la petición.
 * @param deps Dependencias de la única operación que posee el lock.
 * @returns Sesión renovada o null cuando no queda credencial; propaga fallos de red sin borrarla.
 */
async function exchangeStored(deps: SessionRenewalDependencies): Promise<Session | null> {
  const stored = await deps.read();
  if (!stored) return null;
  try {
    const next = await deps.exchange(stored.refreshToken);
    if ((await deps.read())?.refreshToken !== stored.refreshToken)
      throw new Error('La sesión cambió durante la conexión. Volvé a ingresar.');
    await deps.save(next);
    return next;
  } catch (error) {
    if (deps.rejected(error) && (await deps.read())?.refreshToken === stored.refreshToken)
      await deps.remove();
    throw error;
  }
}
