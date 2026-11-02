import { useEffect, useState, useSyncExternalStore } from 'react';
import { getConnecting, subscribeConnection } from '../api/connectionState';
/** Evita parpadeos en conexiones rápidas y explica esperas prolongadas en la app.
 * @returns true después de dos segundos de espera continua.
 */
export function useConnectionNotice() {
  const connecting = useSyncExternalStore(subscribeConnection, getConnecting, () => false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    if (!connecting) return;
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, [connecting]);
  return connecting && visible;
}
