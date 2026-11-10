import type { useBooking } from '../../hooks/useBooking';
import { FormField } from '../molecules/FormField';
import { LoadingState } from '../molecules/LoadingState';
import { Text } from '../atoms/Text';

/** Solicita solo la categoría que determina la cotización.
 * @param props Tipos activos y estado del formulario.
 * @returns Selector de categoría sin patente ni datos del vehículo.
 */
export function BookingTypeField({ b }: { b: ReturnType<typeof useBooking> }) {
  if (b.optionsLoading) return <LoadingState label="Cargando tus opciones…" />;
  if (b.admin && !b.clientId) return <Text>Primero elegí el cliente de la reserva.</Text>;
  return (
    <FormField
      field={{
        name: 'vehicleType',
        label: 'Tipo de vehículo',
        kind: 'choice',
        options: b.types.map((v) => ({ value: v.id, label: v.name })),
      }}
      value={b.vehicleTypeId}
      onChange={b.chooseType}
    />
  );
}
