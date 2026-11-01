import { deleteRefresh, readRefresh, storeRefresh } from '../sessionStorage';
import { setSession } from '../sessionStore';
import * as auth from './authService';
/** Restaura la sesión segura sin publicar resultados de un proveedor desmontado.
 * @param isActive - Permite descartar el resultado si el consumidor se desmontó.
 * @returns `Promise<void>`.
 */
export async function restoreSession(isActive: () => boolean) {
  try {
    const token = await readRefresh();
    if (token) {
      const next = await auth.refreshSession(token);
      if (isActive()) {
        await storeRefresh(next.refreshToken);
        setSession(next);
      }
    }
  } catch {
    await deleteRefresh();
    if (isActive()) setSession(null);
  }
}
