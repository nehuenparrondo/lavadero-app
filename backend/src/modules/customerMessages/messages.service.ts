import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import type { Actor } from '../../types/domain.js';
import type { Executor } from '../../utils/db.js';
import { transaction } from '../../utils/transaction.js';
import { assertAppointmentAccess } from '../appointments/appointments.access.js';
import { findAppointment } from '../appointments/appointments.repository.js';
import { isoTime } from '../appointments/schedule.js';
import { latestWash } from '../appointments/wash.repository.js';
import { insertMessage, listMessages, resolveMessage } from './messages.repository.js';
import type { messageQuery, messageSchema } from './messages.schema.js';

/** Administración ve la bandeja completa; el cliente solo ve sus propios mensajes.
 * @param actor - Identidad que restringe la bandeja; query aplica filtros y paginación.
 * @returns Mensajes autorizados y fechas ISO.
 */
export async function getMessages(actor: Actor, query: z.infer<typeof messageQuery>) {
  const result = await listMessages(
    actor.role === 'admin' ? null : actor.id,
    query.state,
    query.page,
    query.limit,
  );
  return {
    ...result,
    items: result.items.map((item) => ({
      ...item,
      createdAt: isoTime(item.createdAt),
      resolvedAt: item.resolvedAt ? isoTime(item.resolvedAt) : null,
    })),
  };
}

/** Una devolución queda asociada al parte verificado y al cliente dueño del turno.
 * @param actor - Cliente que envía el reclamo o devolución descrito en input.
 * @returns Identificador del mensaje creado.
 */
export async function createMessage(actor: Actor, input: z.infer<typeof messageSchema>) {
  if (input.kind === 'complaint') {
    const result = await insertMessage(actor.id, input.kind, input.body, null);
    return { id: String(result.insertId) };
  }
  return transaction(async (connection) => {
    const appointment = await findAppointment(input.appointmentId, connection, true);
    assertAppointmentAccess(actor, appointment);
    const submissionId = await feedbackTarget(appointment.id, appointment.status, connection);
    const result = await insertMessage(
      actor.id,
      input.kind,
      input.body,
      submissionId,
      connection,
    );
    return { id: String(result.insertId) };
  });
}

/** Comprueba la revisión y evita devoluciones duplicadas bajo el bloqueo del turno. */
async function feedbackTarget(id: string, status: string, connection: Executor) {
  const submission = await latestWash(id, connection);
  if (
    status !== 'completed' ||
    !submission ||
    (submission.decision !== 'approved' && !submission.completedByEmployee)
  )
    throw new AppError(
      409,
      'UNVERIFIED_WASH',
      'La devolución se habilita cuando el lavado está finalizado.',
    );
  if (submission.feedbackId)
    throw new AppError(409, 'FEEDBACK_EXISTS', 'Ya enviaste una devolución para este turno.');
  return submission.id;
}

/** Guarda la respuesta del administrador, visible para el titular en su bandeja.
 * @param actor - Administrador que responde al mensaje id con el texto reply.
 * @returns Confirmación del cierre.
 */
export async function replyToMessage(actor: Actor, id: string, reply: string) {
  const result = await resolveMessage(id, actor.id, reply);
  if (!result.affectedRows)
    throw new AppError(
      409,
      'MESSAGE_CLOSED',
      'El mensaje ya fue resuelto o no está disponible.',
    );
  return { resolved: true };
}
