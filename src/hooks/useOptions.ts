import { useEffect, useState } from 'react';
import { readOptions } from '../api/services/resourceService';
import type { Query } from '../api/services/resourceService';
import { errorMessage } from '../utils/errorMessage';
/** Lee todas las páginas de un selector, solo cuando el rol lo permite. */
export function useOptions<T>(path: string, query: Query = {}, enabled = true) {
  const key = JSON.stringify(query);
  const [items, setItems] = useState<T[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    if (!enabled) {
      setItems([]);
      return;
    }
    void readOptions<T>(path, JSON.parse(key) as Query)
      .then((data) => {
        if (active) {
          setItems(data);
          setError('');
        }
      })
      .catch((e) => {
        if (active) setError(errorMessage(e));
      });
    return () => {
      active = false;
    };
  }, [path, key, enabled]);
  return { items, error };
}
