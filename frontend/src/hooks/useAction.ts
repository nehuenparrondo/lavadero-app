import { useState } from 'react';
import { errorMessage } from '../utils/errorMessage';
/** Ejecuta una acción y publica carga/error/resultado sin propagar errores a la vista.
 * @returns busy, error, message, run y clear; run devuelve undefined si captura un rechazo.
 */
export function useAction() {
  const [state, setState] = useState({ busy: false, error: '', message: '' });
  /** Publica ocupado/error y devuelve undefined al fallar para evitar navegación o cierre prematuros. */
  async function run<T>(
    task: () => Promise<T>,
    success = 'Cambios guardados.',
  ): Promise<T | undefined> {
    setState({ busy: true, error: '', message: '' });
    try {
      const result = await task();
      setState({ busy: false, error: '', message: success });
      return result;
    } catch (error) {
      setState({ busy: false, error: errorMessage(error), message: '' });
      return undefined;
    }
  }
  const clear = () => setState((current) => ({ ...current, error: '', message: '' }));
  return { ...state, run, clear };
}
