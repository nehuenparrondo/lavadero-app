import type { AuthRequest, AuthSessionResult } from 'expo-auth-session';
import { useEffect } from 'react';
import type { useSocialExchange } from './useSocialExchange';
/** Completa retornos nativos y muestra también cancelaciones y errores del proveedor.
 * @param request - Petición HTTP de Express; su entrada se valida antes de ejecutar el caso de uso.
 * @param response - Respuesta HTTP donde se escribe el contrato uniforme de error.
 * @param action - Estado y ejecutor de la acción remota.
 * @returns No devuelve un valor: sincroniza el retorno con el canje y el estado de error compartido.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function useSocialResponse(
  request: AuthRequest | null,
  response: AuthSessionResult | null,
  action: ReturnType<typeof useSocialExchange>,
) {
  useEffect(() => {
    if (response?.type === 'success' && request?.codeVerifier) {
      const verifier = request.codeVerifier;
      const code = response.params.code;
      if (code) void action.run(() => action.complete(code, verifier), '');
    } else if (response && ['error', 'cancel', 'dismiss'].includes(response.type)) {
      void action.run(async () => {
        throw new Error(
          'El ingreso social se canceló o no pudo completarse. Volvé a intentarlo.',
        );
      }, '');
    }
  }, [response]);
}
