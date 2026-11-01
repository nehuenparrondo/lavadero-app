import { isAxiosError } from 'axios';
import { useState } from 'react';
import { exchangeSocial } from '../api/services/authService';
import { useAction } from './useAction';
import { useAuth } from './useAuth';
/** Canje compartido por web/APK; la contraseña se conserva solo mientras se envía.
 * @returns Canje, confirmación local, cancelación y estado de vinculación requerida.
 */
export function useSocialExchange() {
  const auth = useAuth();
  const action = useAction();
  const [pending, setPending] = useState<{ code: string; verifier: string } | null>(null);
  const complete = async (code: string, verifier: string, password?: string) => {
    try {
      await auth.accept(await exchangeSocial(code, verifier, password));
      setPending(null);
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.error?.code === 'OAUTH_LINK_REQUIRED')
        setPending({ code, verifier });
      else throw error;
    }
  };
  const confirm = async (values: Record<string, string>) => {
    if (pending)
      await action.run(() => complete(pending.code, pending.verifier, values.password), '');
  };
  return {
    ...action,
    complete,
    confirm,
    linkRequired: Boolean(pending),
    cancelLink: () => setPending(null),
  };
}
