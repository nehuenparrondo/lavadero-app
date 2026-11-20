import { AppError } from '../../errors/AppError.js';
import type { Actor } from '../../types/domain.js';
import type { Executor } from '../../utils/db.js';
import type { Appointment } from './appointments.types.js';
import { execute } from '../../utils/db.js';
import { transaction } from '../../utils/transaction.js';
import { readHours, readSettings } from '../settings/settings.repository.js';
import { assertAppointmentAccess } from './appointments.access.js';
import { findAppointment, setStatus } from './appointments.repository.js';
import { assertCompletionTime } from './schedule.js';
import { latestWash, submitWash } from './wash.repository.js';

/** Finaliza directamente un lavado cobrado por su responsable, con parte y hora verificables.
 * @param actor Empleado activo con permiso de cobros; el administrador no se suplanta como revisor.
 * @param id Turno propio del responsable.
 * @param description Descripción validada del trabajo efectivamente realizado.
 * @returns Estado finalizado; el reintento del mismo cierre no duplica parte ni historial.
 */
export function finishPaidWash(actor: Actor, id: string, description: string) {
  return transaction(async (connection) => {
    const settings = await readSettings(connection, true);
    const appointment = await findAppointment(id, connection, true);
    assertAppointmentAccess(actor, appointment);
    assertFinishOwner(actor, appointment);
    const previous = await latestWash(id, connection);
    if (
      appointment.status === 'completed' &&
      previous?.completedByEmployee &&
      previous.description === description
    )
      return { status: 'completed' };
    assertPaidState(appointment);
    if (!settings) throw new AppError(503, 'SETTINGS_MISSING', 'Falta configurar el negocio.');
    assertCompletionTime(settings, await readHours(connection));
    await completeWashRecord(id, actor.id, description, connection);
    return { status: 'completed' };
  });
}

/** Comprueba el responsable y permiso actual, aunque se envíe la petición fuera de la UI. */
function assertFinishOwner(actor: Actor, appointment: Appointment) {
  if (!actor.canRecordPayments || appointment.employeeId !== actor.id)
    throw new AppError(
      403,
      'FINISH_PERMISSION',
      'Solo el responsable habilitado para cobrar puede finalizar este lavado.',
    );
}

/** Un pago parcial no autoriza cerrar el trabajo ni modificar su historial. */
function assertPaidState(appointment: Appointment) {
  if (!['in_progress', 'awaiting_review'].includes(appointment.status))
    throw new AppError(409, 'WASH_STATE', 'El lavado debe estar en proceso.');
  if (
    Number(appointment.paidCents) < Number(appointment.totalCents) ||
    Number(appointment.totalCents) <= 0
  )
    throw new AppError(
      409,
      'PAYMENT_REQUIRED',
      'Registrá el cobro completo antes de finalizar el lavado.',
    );
}

/** Crea un parte nuevo sin atribuir una aprobación ficticia a Administración. */
async function completeWashRecord(
  id: string,
  employeeId: string,
  description: string,
  connection: Executor,
) {
  const submission = await submitWash(id, employeeId, description, connection);
  await execute(
    'UPDATE partes_lavado SET completed_by_employee=TRUE WHERE id=?',
    [submission.insertId],
    connection,
  );
  await setStatus(id, 'completed', employeeId, connection);
}
