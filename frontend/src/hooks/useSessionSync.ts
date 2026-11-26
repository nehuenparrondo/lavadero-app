import { useEffect } from 'react';
import { subscribeStoredCredential } from '../api/sessionStorage';
import { getSession, setSession } from '../api/sessionStore';
import { changeSessionRevision } from '../api/sessionRevision';

/** Comparte cierre y cambios de cuenta; una rotación ajena actualiza el refresh sin crear un bucle de red.
 * @param restore Reinicia la restauración cuando otra pestaña elige una cuenta diferente.
 * @returns void; retira el listener al desmontarse. Nativo usa un adaptador sin pestañas.
 */
export function useSessionSync(restore: () => void) {
  useEffect(() => {
    let observedOwner = getSession()?.user.id ?? null;
    return subscribeStoredCredential((credential) => {
      const current = getSession();
      const owner = credential?.userId ?? null;
      if (credential && current?.user.id === owner) {
        observedOwner = owner;
        setSession({ ...current, refreshToken: credential.refreshToken });
        return;
      }
      if (owner === observedOwner && !current) return;
      observedOwner = owner;
      changeSessionRevision();
      setSession(null);
      if (credential) restore();
    });
  }, [restore]);
}
