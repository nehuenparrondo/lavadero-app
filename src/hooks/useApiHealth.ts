import { useCallback, useEffect, useState } from 'react';
import { apiUrl } from '../api/client';
import { getApiHealth } from '../api/services/healthService';
import type { HealthState } from '../types/health';

/** Consulta el backend y cancela la solicitud al desmontar.
 * @returns Estado de conectividad y acción retry; captura errores de red.
 */
export function useApiHealth() {
  const [state, setState] = useState<HealthState>(apiUrl ? 'checking' : 'unconfigured');
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  useEffect(() => {
    if (!apiUrl) return;
    const controller = new AbortController();
    setState('checking');
    void getApiHealth(controller.signal).then(
      () => {
        if (!controller.signal.aborted) setState('online');
      },
      () => {
        if (!controller.signal.aborted) setState('offline');
      },
    );
    return () => controller.abort();
  }, [attempt]);
  return { state, retry };
}
