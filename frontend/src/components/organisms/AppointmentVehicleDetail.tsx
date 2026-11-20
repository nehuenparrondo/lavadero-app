import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import type { FormFieldDefinition } from '../../types/form';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { EntityForm } from './EntityForm';

const fields: FormFieldDefinition[] = [
  {
    name: 'description',
    label: 'Detalles para el equipo',
    kind: 'textarea',
    required: false,
    placeholder: 'Ej. barro en los guardabarros o una mancha en el asiento',
    maxLength: 1000,
  },
];

/** Conserva la descripción del cliente junto al turno, separada de los servicios cotizados.
 * @param props - Gestor del detalle y sesión autorizada.
 * @returns Descripción editable por el cliente antes de empezar el lavado.
 */
export function AppointmentVehicleDetail({
  m,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
}) {
  const a = m.detail.data;
  if (!a) return null;
  return (
    <Card>
      <Text style={{ fontWeight: '700' }}>Descripción del vehículo</Text>
      {m.user?.role === 'client' && a.status === 'confirmed' ? (
        <EntityForm
          key={a.vehicleDescription ?? ''}
          fields={fields}
          initialValues={{ description: a.vehicleDescription ?? '' }}
          busy={m.action.busy}
          submitLabel="Guardar descripción"
          onSubmit={async ({ description }) => {
            await m.mutate('patch', '/vehicle-detail', { description });
          }}
        />
      ) : (
        <Text>{a.vehicleDescription || 'Sin detalles adicionales.'}</Text>
      )}
    </Card>
  );
}
