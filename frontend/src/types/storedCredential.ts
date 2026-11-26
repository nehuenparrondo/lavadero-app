/** Persistencia sin perfil ni permisos: el backend valida identidad y rol al reabrir. */
export interface StoredCredential {
  refreshToken: string;
  userId: string | null;
  expiresAt: number | null;
}
/** Interfaz mínima para probar almacenamiento web sin depender del navegador. */
export interface CredentialStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
