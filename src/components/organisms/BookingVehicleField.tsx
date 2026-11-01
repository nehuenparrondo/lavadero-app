import { useBooking } from '../../hooks/useBooking';
import { FormField } from '../molecules/FormField';
/** Presenta booking vehicle field con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: b. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function BookingVehicleField({ b }: { b: ReturnType<typeof useBooking> }) {
  return (
    <FormField
      field={{
        name: 'vehicle',
        label: 'Vehículo',
        kind: 'choice',
        options: b.vehicles.map((v) => ({
          value: v.id,
          label: `${v.plate} · ${v.brand} ${v.model}`,
        })),
      }}
      value={b.vehicleId}
      onChange={b.chooseVehicle}
    />
  );
}
