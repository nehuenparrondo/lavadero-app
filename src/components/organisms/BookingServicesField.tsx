import { useBooking } from '../../hooks/useBooking';
import { Text } from '../atoms/Text';
import { FormField } from '../molecules/FormField';
import { Notice } from '../molecules/Notice';
import { money } from '../../utils/format';
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
  const typeId = b.vehicles.find((v) => v.id === b.vehicleId)?.vehicleTypeId;
  const options = b.offered.map((service) => {
    const price = service.prices.find((p) => p.vehicleTypeId === typeId);
    return {
      value: service.id,
      label: `${service.name} · ${service.durationMinutes} min · ${money(price?.priceCents)}`,
    };
  });
  return (
    <>
      <FormField
        field={{ name: 'services', label: 'Servicios', kind: 'multiple', options }}
        value={b.serviceIds}
        onChange={b.setServiceIds}
      />
      {b.needsWash && (
        <Notice error="Para agregar encerado, elegí también lavado exterior o completo." />
      )}
    </>
  );
}
