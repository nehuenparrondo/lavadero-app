import type { PropsWithChildren } from 'react';
import { createContext, useEffect, useState } from 'react';
import { accept, reloadUser, signOut } from '../api/services/sessionActions';
import { getSession, subscribeSession } from '../api/sessionStore';
import { useSessionRestore } from '../hooks/useSessionRestore';
import type { Session, User } from '../types/entities';
interface AuthValue {
  user: User | null;
  restoring: boolean;
  accept: (session: Session) => Promise<void>;
  signOut: () => Promise<void>;
  reloadUser: () => Promise<void>;
}

/** Contexto de sesión compartido por las experiencias de los tres roles. */
export const AuthContext = createContext<AuthValue | undefined>(undefined);
/** Conecta la sesión restaurada con navegación y formularios; no contiene lógica HTTP.
 * @param props - Propiedades tipadas: children. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function AuthProvider({ children }: PropsWithChildren) {
  const [session, update] = useState(getSession());
  const restoring = useSessionRestore();
  useEffect(() => subscribeSession(update), []);
  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, restoring, accept, signOut, reloadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
