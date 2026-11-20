import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import { parseResetLink } from '../utils/resetLink';
/** Variante nativa: un enlace web puede abrir la pantalla de recuperación.
 * @returns Secreto en memoria, sin escribirlo en el almacenamiento del dispositivo.
 */
export function useResetToken() {
  const [token, setToken] = useState('');
  useEffect(() => {
    void Linking.getInitialURL().then((url) => setToken(parseResetLink(url ?? '')));
  }, []);
  return token;
}
