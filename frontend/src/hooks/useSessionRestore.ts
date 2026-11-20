import { useCallback, useEffect, useState } from 'react';
import { restoreSession } from '../api/services/restoreSession';
import { errorMessage } from '../utils/errorMessage';
/** Conserva credenciales ante una caída de conexión y permite reintentar el arranque.
 * @returns Estado de arranque, error recuperable y retryRestore.
 */
export function useSessionRestore() {
  const [restoring, setRestoring] = useState(true);
  const [restoreError, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const retryRestore = useCallback(() => setAttempt((value) => value + 1), []);
  useEffect(() => {
    let active = true;
    setRestoring(true);
    setError('');
    void restoreSession(() => active)
      .catch((error) => {
        if (active) setError(errorMessage(error));
      })
      .finally(() => {
        if (active) setRestoring(false);
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  return { restoring: restoring || Boolean(restoreError), restoreError, retryRestore };
}
