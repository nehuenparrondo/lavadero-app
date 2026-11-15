import { useEffect, useState } from 'react';
import { parseResetLink } from '../utils/resetLink';
declare global {
  interface Window {
    __lavaderoRecoveryToken?: () => string;
  }
}
/** Retira el fragmento del historial después de capturarlo en memoria.
 * @returns Token efímero; recargar exige volver a abrir el enlace del correo.
 */
export function useResetToken() {
  const [token] = useState(() =>
    typeof window === 'undefined'
      ? ''
      : (window.__lavaderoRecoveryToken?.() ?? parseResetLink(window.location.href)),
  );
  useEffect(() => {
    if (typeof window !== 'undefined') delete window.__lavaderoRecoveryToken;
  }, []);
  return token;
}
