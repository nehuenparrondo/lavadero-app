import type { Appointment } from '../../types/entities';
import { useAppointmentVehicle } from '../../hooks/useAppointmentVehicle';
import { vehicleIdentityFields } from '../../utils/vehicleForm';
import { Card } from '../molecules/Card';
import { Notice } from '../molecules/Notice';
import { Text } from '../atoms/Text';
import { EntityForm } from './EntityForm';

/** Completa el vehículo de un turno ya confirmado.
 * @param props Turno y recarga de detalle, con modo asistido para Administración.
 * @returns Formulario de datos y opción de usar un vehículo existente.
 */
export function AppointmentVehicleAttachment({
  appointment,
  admin,
  refresh,
}: {
  appointment: Appointment;
  admin: boolean;
  refresh: () => Promise<void>;
}) {
  const m = useAppointmentVehicle(appointment, admin, refresh);
  return (
    <Card>
      <Text style={{ fontWeight: '800', fontSize: 19 }}>Agregá el vehículo a tu turno</Text>
      <Text>
        El horario está confirmado. Vinculá los datos del{' '}
        {appointment.vehicleType?.toLowerCase() ?? 'vehículo'} para completar la reserva.
      </Text>
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
