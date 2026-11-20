import { usePathname } from 'expo-router';
import { useRef } from 'react';
/** Conserva el enlace solicitado mientras las guardas esperan la sesión.
 * @param restoring true durante la restauración o su reintento.
 * @returns Ruta pública de espera con el destino interno original.
 */
export function useRestoreDestination(restoring: boolean) {
  const path = usePathname();
  const requested = useRef(path);
  if (restoring && path !== '/loading') requested.current = path;
  return `/loading?returnTo=${encodeURIComponent(requested.current)}` as const;
}
