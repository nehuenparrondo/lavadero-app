import * as SecureStore from 'expo-secure-store';
import type { StoredCredential } from '../types/storedCredential';
import { decodeCredential, encodeCredential } from '../utils/credentialCodec';
const key = 'lavadero.refresh';
/** Lee la credencial cifrada nativa; reconoce tokens legados hasta su primera renovación.
 * @returns Credencial vigente o null; el perfil/rol se recuperan exclusivamente desde el servidor.
 */
export async function readStoredCredential() {
  return decodeCredential(await SecureStore.getItemAsync(key));
}
/** Consulta el refresh sin exponer metadatos al transporte.
 * @returns Token vigente o null al cerrar sesión/vencer la persistencia local.
 */
export async function readRefresh() {
  return (await readStoredCredential())?.refreshToken ?? null;
}
/** Conserva refresh y titular en almacenamiento seguro para todos los roles/proveedores.
 * @param token Credencial opaca del servidor; nunca una contraseña.
 * @param userId ID del titular confirmado por la API.
 * @returns Promesa resuelta después de persistir y antes de publicar la sesión.
 */
export async function storeRefresh(token: string, userId: string) {
  await SecureStore.setItemAsync(key, encodeCredential(token, userId));
}
/** Elimina la credencial del dispositivo, además del estado de navegación.
 * @returns Promesa resuelta al quitar la persistencia local.
 */
export async function deleteRefresh() {
  await SecureStore.deleteItemAsync(key);
}
/** Adaptador común de sincronización; nativo tiene un único contexto JavaScript de sesión.
 * @param listener Consumidor común; nativo no recibe eventos entre pestañas web.
 * @returns Limpieza compatible con la implementación web.
 */
export function subscribeStoredCredential(listener: (value: StoredCredential | null) => void) {
  void listener;
  return () => {};
}
