import { useEffect, useState } from 'react';
import { restoreSession } from '../api/services/restoreSession';
/** Publica la fase de arranque y cancela lógicamente respuestas tardías.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useSessionRestore() {
  const [restoring, setRestoring] = useState(true);
  useEffect(() => {
    let active = true;
    void restoreSession(() => active).finally(() => {
      if (active) setRestoring(false);
    });
    return () => {
      active = false;
    };
  }, []);
  return restoring;
}
