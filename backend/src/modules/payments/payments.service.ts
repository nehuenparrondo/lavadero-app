import type { z } from 'zod';
import { AppError } from '../../errors/AppError.js';
import type { Actor } from '../../types/domain.js';
import { transaction } from '../../utils/transaction.js';
import { assertAppointmentAccess } from '../appointments/appointments.access.js';
import { findAppointment } from '../appointments/appointments.repository.js';
import * as repo from './payments.repository.js';
import type { paymentSchema } from './payments.schema.js';
/** Lista cobros propios o administrados; empleados solo pueden registrar cuando están habilitados.
 * @param actor - Actor autenticado por el middleware; determina rol y propiedad.
 * @param id - Identificador del recurso dentro del proyecto actual.
 * @returns `Promise<import("mysql2").RowDataPacket[]>`.
 */
export async function getPayments(actor: Actor, id: string) {
  const a = await findAppointment(id);
  assertAppointmentAccess(actor, a);
  return repo.listPayments(id);
}
/** Registra un cobro de forma atómica; no ejecuta una transferencia bancaria.
 * @param actor Administrador o empleado del equipo con canRecordPayments vigente.
 * @param id Turno cuyo saldo se bloquea antes de insertar.
 * @param input Centavos, medio, referencia y clave de idempotencia de la misma intención.
 * @returns replayed true para un reintento idéntico; una alta nueva incluye id.
 * @throws AppError PAYMENT_PERMISSION, PAYMENT_STATE, OVERPAYMENT o IDEMPOTENCY_CONFLICT.
 */
export async function recordPayment(
  actor: Actor,
  id: string,
  input: z.infer<typeof paymentSchema>,
) {
  return transaction(async (connection) => {
    const appointment = await findAppointment(id, connection, true);
    assertAppointmentAccess(actor, appointment);
    if (actor.role === 'employee' && !actor.canRecordPayments)
      throw new AppError(
        403,
        'PAYMENT_PERMISSION',
        'No estás habilitado para registrar cobros.',
      );
    const previous = await repo.findPayment(input.idempotencyKey, connection);
    if (previous) {
      assertSamePayment(previous, id, input);
      return { recorded: true, replayed: true };
    }
    if (!['in_progress', 'awaiting_review', 'completed'].includes(appointment.status))
      throw new AppError(
        409,
        'PAYMENT_STATE',
        'Registrá el cobro cuando el trabajo esté en proceso o finalizado.',
      );
    if (input.amountCents > Number(appointment.totalCents) - Number(appointment.paidCents))
      throw new AppError(409, 'OVERPAYMENT', 'El importe supera el saldo pendiente.');
    const paymentId = await repo.insertPayment(id, actor.id, input, connection);
    return { recorded: true, id: paymentId, replayed: false };
  });
}

/** Una clave de idempotencia solo puede representar la misma operación e importe. */
function assertSamePayment(
  previous: NonNullable<Awaited<ReturnType<typeof repo.findPayment>>>,
  id: string,
  input: z.infer<typeof paymentSchema>,
) {
  if (
    previous.appointmentId !== id ||
    previous.amountCents !== input.amountCents ||
    previous.method !== input.method ||
    (previous.reference ?? null) !== (input.reference ?? null)
  )
    throw new AppError(
      409,
      'IDEMPOTENCY_CONFLICT',
      'La clave de pago ya se usó con otros datos.',
    );
}
