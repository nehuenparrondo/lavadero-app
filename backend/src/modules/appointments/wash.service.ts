import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import { ForbiddenError } from '../../errors/ForbiddenError.js';
import type { Actor } from '../../types/domain.js';
import { transaction } from '../../utils/transaction.js';
import { readHours, readSettings } from '../settings/settings.repository.js';
import { assertAppointmentAccess } from './appointments.access.js';
import { findAppointment, setStatus } from './appointments.repository.js';
import type { reviewSchema } from './work.schema.js';
import { assertCompletionTime, isoTime } from './schedule.js';
import { latestWash, recordReview, submitWash } from './wash.repository.js';

/** Solo el responsable registra la finalización física, durante el horario de trabajo.
 * @param actor - Empleado responsable; id y description identifican el trabajo realizado.
 * @returns Estado que espera revisión.
 */
export function sendWashForReview(actor: Actor, id: string, description: string) {
  return transaction(async (connection) => {
    const settings = await readSettings(connection, true);
    const appointment = await findAppointment(id, connection, true);
    assertAppointmentAccess(actor, appointment);
    if (appointment.employeeId !== actor.id)
      throw new ForbiddenError(
        'Solo el responsable del turno puede enviar el lavado a revisión.',
      );
    if (appointment.status !== 'in_progress')
      throw new AppError(409, 'WASH_STATE', 'El lavado debe estar en proceso.');
    if (!settings) throw new AppError(503, 'SETTINGS_MISSING', 'Falta configurar el negocio.');
    assertCompletionTime(settings, await readHours(connection));
    await submitWash(id, actor.id, description, connection);
    await setStatus(id, 'awaiting_review', actor.id, connection);
    return { status: 'awaiting_review' };
  });
}

/** Valida el parte exacto inspeccionado; una revisión desactualizada no decide un parte nuevo.
 * @param actor - Administrador; id identifica el turno e input contiene la decisión y parte.
 * @returns Estado resultante de la revisión.
 */
export function reviewWash(actor: Actor, id: string, input: z.infer<typeof reviewSchema>) {
  return transaction(async (connection) => {
    const settings = await readSettings(connection, true);
    const appointment = await findAppointment(id, connection, true);
    assertAppointmentAccess(actor, appointment);
    const submission = await latestWash(id, connection);
    if (
      appointment.status !== 'awaiting_review' ||
      submission?.id !== input.submissionId ||
      submission.decision
    )
      throw new AppError(
        409,
        'REVIEW_STALE',
        'El parte cambió. Actualizá el turno antes de revisarlo.',
      );
    if (input.decision === 'approved') {
      if (!settings)
        throw new AppError(503, 'SETTINGS_MISSING', 'Falta configurar el negocio.');
      assertCompletionTime(settings, await readHours(connection));
    }
    await recordReview(submission.id, actor.id, input.decision, input.note, connection);
    const status = input.decision === 'approved' ? 'completed' : 'in_progress';
    await setStatus(id, status, actor.id, connection);
    return { status };
  });
}

/** El cliente ve el parte aprobado; el equipo también ve envíos y correcciones internas.
 * @param actor - Rol que determina qué campos son visibles; id es el turno autorizado.
 * @returns Parte proyectado o null cuando aún no es visible.
 */
export async function presentWash(actor: Actor, id: string) {
  const submission = await latestWash(id);
  if (
    !submission ||
    (actor.role === 'client' &&
      submission.decision !== 'approved' &&
      !submission.completedByEmployee)
  )
    return null;
  const publicFields = {
    id: submission.id,
    employeeName: submission.employeeName,
    description: submission.description,
    submittedAt: isoTime(submission.submittedAt),
    decision: submission.decision,
    reviewedAt: submission.reviewedAt ? isoTime(submission.reviewedAt) : null,
    completedByEmployee: Boolean(submission.completedByEmployee),
  };
  if (actor.role === 'client') return { ...publicFields, feedbackId: submission.feedbackId };
  return {
    ...publicFields,
    reviewNote: submission.reviewNote,
    reviewerName: submission.reviewerName,
  };
}
