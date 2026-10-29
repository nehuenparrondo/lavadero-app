import type { Session } from '../types/entities';
let current: Session | null = null;
const subscribers = new Set<(session: Session | null) => void>();
/** Lee sesión solo en memoria; componentes consumen AuthContext. */
export function getSession() {
  return current;
}
/** Publica cambios de sesión para que guardas y navegación reaccionen a nuevos permisos. */
export function setSession(session: Session | null) {
  current = session;
  subscribers.forEach((callback) => callback(session));
}
/** Suscribe estado global y devuelve limpieza. */
export function subscribeSession(callback: (session: Session | null) => void) {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}
