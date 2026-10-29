import { createContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { Session, User } from '../types/entities';
import { getSession, setSession, subscribeSession } from '../api/sessionStore';
import { readRefresh, storeRefresh, deleteRefresh } from '../api/sessionStorage';
import * as auth from '../api/services/authService';
import { readResource } from '../api/services/resourceService';
interface AuthValue {
  user: User | null;
  restoring: boolean;
  accept: (session: Session) => Promise<void>;
  signOut: () => Promise<void>;
  reloadUser: () => Promise<void>;
}
/** Estado global de sesión. */
export const AuthContext = createContext<AuthValue | undefined>(undefined);
/** Restaura refresh seguro y sincroniza navegación con cambios de permisos de la API. */
export function AuthProvider({ children }: PropsWithChildren) {
  const [session, update] = useState(getSession());
  const [restoring, setRestoring] = useState(true);
  useEffect(() => subscribeSession(update), []);
  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const token = await readRefresh();
        if (token) {
          const next = await auth.refreshSession(token);
          if (active) {
            await storeRefresh(next.refreshToken);
            setSession(next);
          }
        }
      } catch {
        await deleteRefresh();
        if (active) setSession(null);
      } finally {
        if (active) setRestoring(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);
  const accept = async (next: Session) => {
    await storeRefresh(next.refreshToken);
    setSession(next);
  };
  const signOut = async () => {
    const token = getSession()?.refreshToken;
    setSession(null);
    await deleteRefresh();
    if (token)
      try {
        await auth.logout(token);
      } catch {
        /* La sesión local ya se eliminó; backend aplica vencimiento. */
      }
  };
  const reloadUser = async () => {
    const current = getSession();
    if (current) {
      const user = await readResource<User>('/users/me');
      setSession({ ...current, user });
    }
  };
  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, restoring, accept, signOut, reloadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
