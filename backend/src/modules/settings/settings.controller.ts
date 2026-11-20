import type { Request } from 'express';
import type { z } from 'zod';
import type { settingsSchema } from './settings.schema.js';
import { getSettings, saveSettings } from './settings.service.js';
/** Consulta configuración del negocio.
 * @returns Promesa de un objeto con hours, currencyCode, timeZone, cancellationNoticeMinutes, simultaneousCapacity, slotStepMinutes, constructor.
 */
export function get() {
  return getSettings();
}
/** Guarda configuración administrativa validada.
 * @param r - Petición HTTP; los valores se validan antes de ejecutar el servicio.
 * @returns Promesa de un objeto con hours, currencyCode, timeZone, cancellationNoticeMinutes, simultaneousCapacity, slotStepMinutes, constructor.
 */
export function save(r: Request) {
  return saveSettings(r.body as z.infer<typeof settingsSchema>);
}
