import { useBooking } from '../../hooks/useBooking';
import { FormField } from '../molecules/FormField';
/** Selecciona un vehículo del titular y orienta cuando aún no tiene ninguno.
 * @param props - Propiedades tipadas: b.
 * @returns Vista de BookingVehicleField con el contrato de propiedades declarado.
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
