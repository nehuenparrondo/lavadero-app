import { useState } from 'react';
import {
  getRecoveryStatus,
  requestPasswordRecovery,
  resetPassword,
} from '../api/services/recoveryService';
import { useAction } from './useAction';
import { useAuth } from './useAuth';
/** Coordina el formulario de solicitud sin revelar si el correo está registrado.
 * @returns Estado de envío y operación del formulario.
 */
export function usePasswordRecovery() {
  const action = useAction();
  const [sent, setSent] = useState(false);
  const submit = async (values: Record<string, string>) => {
    await action.run(async () => {
      const status = await getRecoveryStatus();
      if (!status.enabled)
        throw new Error('La recuperación no está disponible. Intentá más tarde.');
      await requestPasswordRecovery(values.email!);
      setSent(true);
    }, 'Si el correo corresponde a una cuenta activa, el enlace aparecerá en la bandeja de pruebas de Mailtrap.');
  };
  return { ...action, sent, submit };
}
/** Compara contraseñas y consume el enlace, conservando la respuesta ante errores.
 * @param token - Secreto de recuperación mantenido en memoria.
 * @returns Estado y operación del formulario de nueva contraseña.
 */
export function usePasswordReset(token: string) {
  const action = useAction();
  const auth = useAuth();
  const [done, setDone] = useState(false);
  const submit = async (values: Record<string, string>) => {
    await action.run(async () => {
      if (values.newPassword !== values.confirmPassword)
        throw new Error('Las contraseñas no coinciden.');
      await resetPassword(token, values.newPassword!);
      await auth.signOut();
      setDone(true);
    }, 'Tu contraseña fue cambiada. Volvé a ingresar; las sesiones anteriores se cerraron.');
  };
  return { ...action, done, submit };
}
