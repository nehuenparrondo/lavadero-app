import { useBooking } from '../../hooks/useBooking';
import { Text } from '../atoms/Text';
import { FormField } from '../molecules/FormField';
/** Ofrece servicios activos con tarifa para el vehículo elegido.
 * @param props - Propiedades tipadas: b.
 * @returns Vista de BookingServicesField con el contrato de propiedades declarado.
 */
export function BookingServicesField({ b }: { b: ReturnType<typeof useBooking> }) {
  if (!b.vehicleId || b.optionsLoading) return null;
  if (!b.offered.length)
    return (
      <Text>
        Todavía no hay servicios con tarifa para este tipo de vehículo. Consultá al lavadero o
        elegí otro vehículo.
      </Text>
    );
  return (
    <FormField
      field={{
        name: 'services',
        label: 'Servicios',
        kind: 'multiple',
        options: b.offered.map((s) => ({
          value: s.id,
          label: `${s.name} · ${s.durationMinutes} min`,
        })),
      }}
      value={b.serviceIds}
      onChange={b.setServiceIds}
    />
  );
}
