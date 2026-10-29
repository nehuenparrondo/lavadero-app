import { useState } from 'react';
import { errorMessage } from '../utils/errorMessage';
/** Ejecuta acciones con carga, error y resultado; evita lógica HTTP dentro de JSX. */
export function useAction() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  async function run<T>(
    task: () => Promise<T>,
    success = 'Cambios guardados.',
  ): Promise<T | undefined> {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const result = await task();
      setMessage(success);
      return result;
    } catch (e) {
      setError(errorMessage(e));
      return undefined;
    } finally {
      setBusy(false);
    }
  }
  return {
    busy,
    error,
    message,
    run,
    clear: () => {
      setError('');
      setMessage('');
    },
  };
}
