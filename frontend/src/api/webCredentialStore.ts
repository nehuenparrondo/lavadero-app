import type { CredentialStorage } from '../types/storedCredential';
import { decodeCredential, encodeCredential } from '../utils/credentialCodec';
/** Almacenamiento del origen, separado de la clave de pestaña de las versiones anteriores. */
export const persistentCredentialKey = 'lavadero.session.v1';
/** Credencial heredada; solo se migra después de renovarla con el servidor. */
export const legacyCredentialKey = 'lavadero.refresh';

/** Encapsula persistencia y migración web, con almacenes inyectables para pruebas.
 * @param persistent Almacenamiento que sobrevive al cierre del navegador.
 * @param legacy Almacenamiento de la pestaña de una versión anterior.
 * @param now Reloj que comprueba la vigencia local.
 * @returns Lectura/escritura/cierre; la marca de cierre impide resucitar una copia legacy en otra pestaña.
 */
export function createWebCredentialStore(
  persistent: CredentialStorage,
  legacy: CredentialStorage,
  now = Date.now,
) {
  return {
    read: () =>
      decodeCredential(
        persistent.getItem(persistentCredentialKey) ?? legacy.getItem(legacyCredentialKey),
        now(),
      ),
    write: (token: string, userId: string) => {
      persistent.setItem(persistentCredentialKey, encodeCredential(token, userId, now()));
      legacy.removeItem(legacyCredentialKey);
    },
    remove: () => {
      // Sin token: evita restaurar una copia legacy conservada en otra pestaña.
      persistent.setItem(
        persistentCredentialKey,
        JSON.stringify({ version: 1, signedOut: true }),
      );
      legacy.removeItem(legacyCredentialKey);
    },
  };
}
