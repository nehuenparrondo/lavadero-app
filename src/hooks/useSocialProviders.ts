import { useEffect, useState } from 'react';
import { getProviders } from '../api/services/authService';
import { useAction } from './useAction';
/** Consulta proveedores y permite reintentar si Render estaba despertando.
 * @returns Proveedores recibidos, estado busy/error y refresh para reintentar.
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
