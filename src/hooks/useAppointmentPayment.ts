import { randomUUID } from 'expo-crypto';
import { useRef } from 'react';
import { pesosToCents } from '../utils/pesosToCents';
import type { useAppointmentMutation } from './useAppointmentMutation';
/** Mantiene la misma clave al reintentar un pago y la renueva solo tras su confirmación.
 * @param mutate - Valor tipado de mutate utilizado por esta operación.
 * @param close - Valor tipado de close utilizado por esta operación.
 * @returns Estado tipado y operaciones del hook; los fallos de acciones remotas se publican en su estado de error.
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
