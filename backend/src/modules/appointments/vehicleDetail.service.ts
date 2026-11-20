import { AppError } from '../../errors/AppError.js';
import type { Actor } from '../../types/domain.js';
import { execute } from '../../utils/db.js';
import { transaction } from '../../utils/transaction.js';
import { assertAppointmentAccess } from './appointments.access.js';
import { findAppointment } from './appointments.repository.js';

/** El titular agrega observaciones al turno confirmado, sin cambiar lo contratado.
 * @param actor - Titular autenticado; id y description identifican la descripción del turno.
 * @returns Confirmación del guardado.
 */
export async function saveVehicleDetail(actor: Actor, id: string, description: string) {
  return transaction(async (connection) => {
    const appointment = await findAppointment(id, connection, true);
    assertAppointmentAccess(actor, appointment);
    if (appointment.status !== 'confirmed')
      throw new AppError(
        409,
        'VEHICLE_DETAIL_CLOSED',
        'Podés editar la descripción antes de que empiece el lavado.',
      );
    await execute(
      `INSERT INTO detalles_vehiculo_turno (appointment_id,description) VALUES (?,?)
       ON DUPLICATE KEY UPDATE description=?`,
      [id, description, description],
      connection,
    );
    return { updated: true };
  });
}
