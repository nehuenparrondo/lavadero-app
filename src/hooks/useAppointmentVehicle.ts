import { writeResource } from '../api/services/resourceService';
import type { Appointment, Vehicle } from '../types/entities';
import { useAction } from './useAction';
import { useOptions } from './useOptions';

/** Carga los vehículos del titular y confirma el vínculo sin volver a reservar el horario.
 * @param appointment Turno confirmado cuyo tipo quedó registrado al reservar.
 * @param admin Permite filtrar por titular en una reserva asistida.
 * @param refresh Actualiza el detalle con la patente asignada.
 * @returns Opciones compatibles y comandos para vincular o registrar.
 */
export function useAppointmentVehicle(
  appointment: Appointment,
  admin: boolean,
  refresh: () => Promise<void>,
) {
  const options = useOptions<Vehicle>(
    '/vehicles',
    admin ? { ownerId: appointment.clientId } : {},
  );
  const action = useAction();
  const attach = async (body: { vehicleId: string } | { vehicle: Record<string, string> }) => {
    const result = await action.run(
      () => writeResource('put', `/appointments/${appointment.id}/vehicle`, body),
      'Vehículo vinculado.',
    );
    if (result) await refresh();
  };
  return {
    action,
    options,
    compatible: options.items.filter((v) => v.vehicleTypeId === appointment.vehicleTypeId),
    attach,
  };
}
