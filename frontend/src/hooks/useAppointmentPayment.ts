import { randomUUID } from 'expo-crypto';
import { useRef } from 'react';
import { pesosToCents } from '../utils/pesosToCents';
import type { useAppointmentMutation } from './useAppointmentMutation';
/** Mantiene la misma clave al reintentar un pago y la renueva solo tras su confirmación.
 * @param mutate - Comando que conserva mensajes y recarga datos tras confirmar.
 * @param close - Cierra el diálogo después de una operación confirmada.
 * @returns Callback de formulario que convierte pesos a centavos y conserva la clave al reintentar.
 */
export function useAppointmentPayment(
  mutate: ReturnType<typeof useAppointmentMutation>['mutate'],
  close: () => void,
) {
  const key = useRef(randomUUID());
  return async (v: Record<string, string>) => {
    const result = await mutate('post', '/payments', {
      amountCents: pesosToCents(v.amount ?? ''),
      method: v.method,
      reference: v.reference || null,
      idempotencyKey: key.current,
    });
    if (result !== undefined) {
      key.current = randomUUID();
      close();
    }
  };
}
