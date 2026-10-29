import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
const key = 'lavadero.refresh';
/** Lee refresh del dispositivo. Web de demostración usa solo sessionStorage de la pestaña. */
export async function readRefresh() {
  return Platform.OS === 'web'
    ? typeof sessionStorage === 'undefined'
      ? null
      : sessionStorage.getItem(key)
    : SecureStore.getItemAsync(key);
}
/** Persiste solo refresh; access token y perfil se mantienen en memoria. */
export async function storeRefresh(token: string) {
  if (Platform.OS === 'web') {
    sessionStorage.setItem(key, token);
    return;
  }
  await SecureStore.setItemAsync(key, token);
}
/** Elimina sesión persistida del dispositivo. */
export async function deleteRefresh() {
  if (Platform.OS === 'web') {
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}
