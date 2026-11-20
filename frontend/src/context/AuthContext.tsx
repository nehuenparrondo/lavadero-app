import type { PropsWithChildren } from 'react';
import { createContext, useEffect, useState } from 'react';
import { accept, reloadUser, signOut } from '../api/services/sessionActions';
import { getSession, subscribeSession } from '../api/sessionStore';
import { useSessionRestore } from '../hooks/useSessionRestore';
import type { Session, User } from '../types/entities';
interface AuthValue {
  user: User | null;
  restoring: boolean;
  restoreError: string;
  retryRestore: () => void;
  accept: (session: Session) => Promise<void>;
  signOut: () => Promise<void>;
  reloadUser: () => Promise<void>;
}

/** Contexto de sesión compartido por las experiencias de los tres roles. */
export const AuthContext = createContext<AuthValue | undefined>(undefined);
/** Conecta la sesión restaurada con navegación y formularios; no contiene lógica HTTP.
 * @param props - Propiedades tipadas: children.
 * @returns Vista de AuthProvider con el contrato de propiedades declarado.
 */
export function AuthProvider({ children }: PropsWithChildren) {
  const [session, update] = useState(getSession());
  const restoration = useSessionRestore();
  useEffect(() => subscribeSession(update), []);
  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, ...restoration, accept, signOut, reloadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
