import type { StoredCredential } from '../types/storedCredential';
import { decodeCredential } from '../utils/credentialCodec';
import { createWebCredentialStore, persistentCredentialKey } from './webCredentialStore';

/** Obtiene los almacenes del origen sin acceder a window durante renderizado de servidor.
 * @returns Adaptador persistente o null fuera del navegador.
 */
function storage() {
  return typeof window === 'undefined'
    ? null
    : createWebCredentialStore(window.localStorage, window.sessionStorage);
}
/** Lee la credencial local; la API valida cuenta, sesión y permisos al reabrir.
 * @returns Credencial vigente o null, incluida migración desde una versión anterior.
 */
export async function readStoredCredential() {
  return storage()?.read() ?? null;
}
/** Consulta el refresh persistente común a las pestañas del mismo origen.
 * @returns Token opaco vigente o null; nunca recupera access JWT ni perfil desde disco.
 */
export async function readRefresh() {
  return (await readStoredCredential())?.refreshToken ?? null;
}
/** Conserva el ingreso al cerrar pestaña/navegador; la vigencia final la decide el backend.
 * @param token Refresh opaco emitido por la API.
 * @param userId Titular confirmado en la sesión recibida.
 * @returns Promesa resuelta tras guardar y retirar la copia heredada de la pestaña.
 */
export async function storeRefresh(token: string, userId: string) {
  const target = storage();
  if (!target) throw new Error('El almacenamiento del navegador no está disponible.');
  target.write(token, userId);
}
/** Quita el token de ambos almacenes y conserva una marca de cierre sin datos sensibles.
 * @returns Promesa resuelta tras el cierre persistente, sincronizado con otras pestañas.
 */
export async function deleteRefresh() {
  storage()?.remove();
}
/** Sincroniza cierre, cambio de cuenta y rotación sin duplicar renovaciones de red.
 * @param listener Recibe credencial nueva o null; no debe usarla como perfil autorizado.
 * @returns Limpieza del listener; el navegador no emite el evento en la pestaña que escribió.
 */
export function subscribeStoredCredential(listener: (value: StoredCredential | null) => void) {
  if (typeof window === 'undefined') return () => {};
  const onStorage = (event: StorageEvent) => {
    if (
      event.storageArea === window.localStorage &&
      (event.key === null || event.key === persistentCredentialKey)
    )
      listener(decodeCredential(event.newValue));
  };
  window.addEventListener('storage', onStorage);
  return () => window.removeEventListener('storage', onStorage);
}
