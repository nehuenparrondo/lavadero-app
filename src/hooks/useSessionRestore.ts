import { useEffect, useState } from 'react';
import { restoreSession } from '../api/services/restoreSession';
/** Publica la fase de arranque y cancela lógicamente respuestas tardías.
 * @returns true durante la restauración y false al finalizar, exista sesión o no.
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
