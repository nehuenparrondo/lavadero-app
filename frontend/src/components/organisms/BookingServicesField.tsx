import type { useBooking } from '../../hooks/useBooking';
import type { Service } from '../../types/entities';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { FormField } from '../molecules/FormField';
import { Notice } from '../molecules/Notice';

type Booking = ReturnType<typeof useBooking>;

/** Ofrece un lavado base y adicionales separados para el tipo cotizado.
 * @param props Estado de servicios y tipo seleccionados.
 * @returns Los selectores que corresponden a la categoría.
 */
export function BookingServicesField({ b }: { b: Booking }) {
  if (!b.vehicleTypeId || b.optionsLoading) return null;
  if (!b.washes.length && !b.extras.length)
    return <Text>Este tipo de vehículo todavía no tiene servicios con tarifa.</Text>;
  return (
    <>
      {b.washes.length > 0 && <WashChoice b={b} />}
      {b.extras.length > 0 && (
        <FormField
          field={{
            name: 'extras',
            label: 'Extras opcionales',
            kind: 'multiple',
            options: serviceOptions(b.extras, b.vehicleTypeId),
          }}
          value={b.extraIds}
          onChange={b.setExtraIds}
        />
      )}
      {b.needsWash && (
        <Notice error="Para agregar encerado, elegí también lavado exterior o completo." />
      )}
    </>
  );
}

/** Una sola selección base; tocar la opción activa permite dejar solo tapizados. */
function WashChoice({ b }: { b: Booking }) {
  const options = serviceOptions(b.washes, b.vehicleTypeId);
  return (
    <FormField
      field={{ name: 'wash', label: 'Tipo de lavado', kind: 'choice', options }}
      value={b.baseId}
      onChange={(value) => b.setBaseId(value === b.baseId ? '' : value)}
    />
  );
}

/** Cada opción usa la tarifa de la categoría elegida. */
function serviceOptions(services: Service[], typeId: string) {
  return services.map((s) => ({
    value: s.id,
    label: s.name,
    description: `${money(s.prices.find((p) => p.vehicleTypeId === typeId)?.priceCents)} · ${s.durationMinutes} min`,
  }));
}
