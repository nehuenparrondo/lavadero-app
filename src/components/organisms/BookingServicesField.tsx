import { useBooking } from '../../hooks/useBooking';
import { FormField } from '../molecules/FormField';
/** Ofrece servicios activos con tarifa para el vehículo elegido.
 * @param props - Propiedades tipadas: b.
 * @returns Vista de BookingServicesField con el contrato de propiedades declarado.
 */
export function BookingServicesField({ b }: { b: ReturnType<typeof useBooking> }) {
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
