import { NotFoundError } from '../../errors/NotFoundError.js';
import type { Actor } from '../../types/domain.js';
import type { Appointment } from './appointments.types.js';
import { isoTime } from './schedule.js';
/** Oculta turnos de otros clientes; el equipo comparte la agenda operativa.
 * @param actor - Actor autenticado por el middleware; determina rol y propiedad.
 * @param appointment - Turno autorizado que conserva datos históricos del contrato.
 * @returns `void`.
 * @throws Error - Cuando no se cumple una precondición indicada en esta operación.
 */
export function assertAppointmentAccess(
  actor: Actor,
  appointment: Appointment | undefined,
): asserts appointment is Appointment {
  if (!appointment || (actor.role === 'client' && appointment.clientId !== actor.id))
    throw new NotFoundError();
}
/** Proyecta el turno por actor sin serializar la fila interna completa.
 * @param v Turno interno con claves de cuenta e importes históricos.
 * @param actor Identidad vigente que determina los campos autorizados.
 * @returns Datos operativos; el empleado recibe importes solo con canRecordPayments.
 */
export function presentAppointment(v: Appointment, actor: Actor) {
  const common = operationalAppointment(v);
  return actor.role === 'employee'
    ? {
        ...common,
        canWork:
          Boolean(v.vehicleId || v.isWalkIn) &&
          (v.employeeId === actor.id || (v.employeeId === null && v.status !== 'in_progress')),
        ...(actor.canRecordPayments
          ? {
              totalCents: Number(v.totalCents),
              paidCents: Number(v.paidCents),
              currencyCode: v.currencyCode,
            }
          : {}),
      }
    : {
        ...common,
        clientId: v.clientId,
        vehicleId: v.vehicleId,
        vehicleTypeId: v.vehicleTypeId,
        ...(actor.role === 'admin'
          ? { employeeId: v.employeeId, canReassign: canReassign(v) }
          : {}),
        totalCents: Number(v.totalCents),
        paidCents: Number(v.paidCents),
        currencyCode: v.currencyCode,
      };
}

/** Un turno en proceso puede recuperarse si el responsable anterior ya no está habilitado.
 * @param v - Turno y disponibilidad vigente del responsable.
 * @returns Si Administración puede elegir otro responsable.
 */
export function canReassign(v: Appointment) {
  return (
    ['pending', 'confirmed'].includes(v.status) ||
    (v.status === 'in_progress' && !v.employeeAvailable)
  );
}

/** Datos mínimos de operación; no contiene identidad de cuenta ni información financiera. */
function operationalAppointment(v: Appointment) {
  return {
    id: v.id,
    status: v.status,
    startsAt: isoTime(v.startsAt),
    endsAt: isoTime(v.endsAt),
    plate: v.plate,
    brand: v.brand,
    model: v.model,
    color: v.color,
    vehicleType: v.vehicleType,
    vehiclePending: v.vehicleId === null && !v.isWalkIn,
    isWalkIn: Boolean(v.isWalkIn),
    employeeName: v.employeeName,
    serviceSummary: v.serviceSummary,
    cancellationReason: v.cancellationReason,
    cancelledByName: v.cancelledByName,
    clientName: v.clientName,
    clientPhone: v.clientPhone,

    version: v.version,
  };
}
