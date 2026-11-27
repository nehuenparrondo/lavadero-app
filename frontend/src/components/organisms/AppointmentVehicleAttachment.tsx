import type { Appointment } from '../../types/entities';
import { useAppointmentVehicle } from '../../hooks/useAppointmentVehicle';
import { vehicleIdentityFields } from '../../utils/vehicleForm';
import { Card } from '../molecules/Card';
import { Notice } from '../molecules/Notice';
import { Text } from '../atoms/Text';
import { EntityForm } from './EntityForm';

/** El cliente completa el vehículo de su turno confirmado, con la categoría que eligió al reservar.
 * @param props Turno propio y recarga del detalle después de vincular el vehículo.
 * @returns Formulario exclusivo del cliente y opción de usar un vehículo propio existente.
 */
export function AppointmentVehicleAttachment({
  appointment,
  refresh,
}: {
  appointment: Appointment;
  refresh: () => Promise<void>;
}) {
  const m = useAppointmentVehicle(appointment, refresh);
  return (
    <Card>
      <Text style={{ fontWeight: '800', fontSize: 19 }}>
        Completá los datos de tu vehículo
      </Text>
      <Text>
        El horario está confirmado. Vinculá los datos del{' '}
        {appointment.vehicleType?.toLowerCase() ?? 'vehículo'} para completar la reserva.
      </Text>
      <Text>Tipo de vehículo: {appointment.vehicleType}. Elegido por vos al reservar.</Text>
      <Notice error={m.action.error || m.options.error} message={m.action.message} />
      {m.compatible.length > 0 && <RegisteredVehicle m={m} />}
      <EntityForm
        fields={vehicleIdentityFields}
        busy={m.action.busy}
        submitLabel="Agregar vehículo al turno"
        onSubmit={(vehicle) => m.attach({ vehicle })}
      />
    </Card>
  );
}

/** Ofrece vehículos ya registrados del tipo reservado. */
function RegisteredVehicle({ m }: { m: ReturnType<typeof useAppointmentVehicle> }) {
  return (
    <EntityForm
      fields={[
        {
          name: 'vehicleId',
          label: 'Usar un vehículo registrado',
          kind: 'choice',
          options: m.compatible.map((v) => ({
            value: v.id,
            label: `${v.plate} · ${v.brand} ${v.model}`,
          })),
        },
      ]}
      busy={m.action.busy}
      submitLabel="Vincular vehículo"
      onSubmit={({ vehicleId }) => m.attach({ vehicleId: vehicleId! })}
    />
  );
}
