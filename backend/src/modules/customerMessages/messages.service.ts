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
 * @param actor - Identidad autenticada que delimita la bandeja.
 * @param query - Estado y paginación validados; no puede ampliar el alcance del cliente.
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

/** Guarda reclamos generales o una devolución única sobre un lavado ya finalizado.
 * @param actor - Cliente autenticado; el mensaje conserva este autor.
 * @param input - Tipo, texto y turno opcional; las devoluciones comprueban titularidad y parte finalizado.
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
 * @param actor - Administrador autenticado autor de la respuesta.
 * @param id - Mensaje abierto que se resuelve con una escritura condicional.
 * @param reply - Respuesta validada y visible para el titular del caso.
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
