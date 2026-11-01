import { useEffect, useState } from 'react';
import { getProviders } from '../api/services/authService';
import { useAction } from './useAction';
/** Consulta proveedores y permite reintentar si Render estaba despertando.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
 */
export function useSocialProviders() {
  const [providers, setProviders] = useState<{ provider: string; enabled: boolean }[]>([]);
  const action = useAction();
  const refresh = () =>
    action.run(async () => {
      setProviders(await getProviders());
    }, '');
  useEffect(() => {
    void refresh();
  }, []);
  return { providers, ...action, refresh };
}
