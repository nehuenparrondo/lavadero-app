import type { useBooking } from '../../hooks/useBooking';
import { Text } from '../atoms/Text';
import { BookingVehicleEmpty } from './BookingVehicleEmpty';
import { FormField } from '../molecules/FormField';
import { LoadingState } from '../molecules/LoadingState';
/** Orienta al titular sin vehículos y ofrece registrar uno antes de reservar.
 * @param props Estado de reserva, opciones y selección de titular.
 * @returns Selector cargado u orientación accionable, nunca un campo vacío.
 */
export function BookingVehicleField({ b }: { b: ReturnType<typeof useBooking> }) {
  if (b.optionsLoading) return <LoadingState label="Cargando tus opciones…" />;
  if (b.admin && !b.clientId) return <Text>Primero elegí el cliente de la reserva.</Text>;
  if (!b.vehicles.length) return <BookingVehicleEmpty admin={b.admin} />;
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
