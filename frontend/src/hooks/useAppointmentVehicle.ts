import { writeResource } from '../api/services/resourceService';
import type { Appointment, Vehicle } from '../types/entities';
import { useAction } from './useAction';
import { useOptions } from './useOptions';

/** Carga los vehículos del titular y confirma el vínculo sin volver a reservar el horario.
 * @param appointment Turno confirmado cuyo tipo quedó registrado al reservar.
 * @param refresh Actualiza el detalle con la patente asignada.
 * @returns Vehículos propios compatibles y comandos del cliente para vincular o registrar.
 */
export function useAppointmentVehicle(appointment: Appointment, refresh: () => Promise<void>) {
  const options = useOptions<Vehicle>('/vehicles');
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
