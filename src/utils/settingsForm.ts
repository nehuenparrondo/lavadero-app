import type { Settings } from '../types/entities';
/** Presenta configuración remota como campos de texto sin alterar zona ni moneda.
 * @param data - Valor tipado de data utilizado por esta operación.
 * @returns `{ days: string; opensAt: string; closesAt: string; capacity: string; cancellation: string; step: string; } | { days?: never; opensAt?: never; closesAt?: never; capacity?: never; cancellation?: never; step?: never; }`, según el contrato de la operación.
 */
export function settingsInitialValues(data: Settings | null) {
  return data
    ? {
        days: data.hours.map((h) => h.weekday).join(','),
        opensAt: data.hours[0]?.opensAt.slice(0, 5) ?? '09:30',
        closesAt: data.hours[0]?.closesAt.slice(0, 5) ?? '16:30',
        capacity: String(data.simultaneousCapacity),
        cancellation: String(data.cancellationNoticeMinutes),
        step: String(data.slotStepMinutes),
      }
    : {};
}
