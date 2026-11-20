import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import { transaction } from '../../utils/transaction.js';
import * as repo from './settings.repository.js';
import type { settingsSchema } from './settings.schema.js';
/** Lee configuración pública de operación, sin datos privados.
 * @returns `Promise<{ hours: repo.BusinessHour[]; currencyCode: string; timeZone: string; cancellationNoticeMinutes: number; simultaneousCapacity: number; slotStepMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export async function getSettings() {
  const settings = await repo.readSettings();
  if (!settings)
    throw new AppError(503, 'SETTINGS_MISSING', 'El negocio todavía no fue configurado.');
  return { ...settings, hours: await repo.readHours() };
}
/** Guarda la configuración serializando con las reservas en curso. No reprograma turnos existentes.
 * @param input - Entrada validada por el esquema del caso de uso.
 * @returns `Promise<{ hours: repo.BusinessHour[]; currencyCode: string; timeZone: string; cancellationNoticeMinutes: number; simultaneousCapacity: number; slotStepMinutes: number; constructor: { name: "RowDataPacket"; }; }>`.
 */
export async function saveSettings(input: z.infer<typeof settingsSchema>) {
  await transaction(async (connection) => {
    await repo.readSettings(connection, true);
    await repo.updateSettings(input, connection);
    await repo.updateHours(input.hours, connection);
  });
  return getSettings();
}
