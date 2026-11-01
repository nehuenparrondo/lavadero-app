import { useBooking } from '../../hooks/useBooking';
import { FormField } from '../molecules/FormField';
/** Presenta booking services field con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: b. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
