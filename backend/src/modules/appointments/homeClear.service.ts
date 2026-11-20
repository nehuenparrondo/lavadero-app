import { DateTime } from 'luxon';
import { AppError } from '../../errors/AppError.js';
import type { Actor } from '../../types/domain.js';
import { hideHomeAppointments } from './appointmentDetails.repository.js';
import { transaction } from '../../utils/transaction.js';
import { readSettings } from '../settings/settings.repository.js';

/** Oculta las visitas del inicio propio; no cancela ni elimina reservas o cobros.
 * @param actor Cliente autenticado, nunca elegido en el cuerpo de la petición.
 * @returns Cantidad ocultada; repetir la acción no modifica el historial.
 */
export function clearClientHome(actor: Actor) {
  return transaction(async (connection) => {
    const settings = await readSettings(connection, true);
    if (!settings) throw new AppError(503, 'SETTINGS_MISSING', 'Falta configurar el negocio.');
    const from = DateTime.now()
      .setZone(settings.timeZone)
      .startOf('day')
      .toUTC()
      .toSQL({ includeOffset: false });
    const result = await hideHomeAppointments(actor.id, from, connection);
    return { hidden: result.affectedRows };
  });
}
