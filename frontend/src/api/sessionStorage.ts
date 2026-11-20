import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
const key = 'lavadero.refresh';
/** Lee refresh del dispositivo. Web de demostración usa solo sessionStorage de la pestaña.
 * @returns `Promise<string | null>`.
 */
export async function readRefresh() {
  return Platform.OS === 'web'
    ? typeof sessionStorage === 'undefined'
      ? null
      : sessionStorage.getItem(key)
    : SecureStore.getItemAsync(key);
}
/** Persiste solo refresh; access token y perfil se mantienen en memoria.
 * @param token - Token recibido; se valida o transforma antes de utilizarlo.
 * @returns `Promise<void>`.
 */
export async function storeRefresh(token: string) {
  if (Platform.OS === 'web') {
    sessionStorage.setItem(key, token);
    return;
  }
  await SecureStore.setItemAsync(key, token);
}
/** Elimina sesión persistida del dispositivo.
 * @returns `Promise<void>`.
 */
export async function deleteRefresh() {
  if (Platform.OS === 'web') {
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}
