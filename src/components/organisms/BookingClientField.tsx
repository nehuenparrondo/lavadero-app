import { useBooking } from '../../hooks/useBooking';
import { FormField } from '../molecules/FormField';
/** Presenta booking client field con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: b. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function BookingClientField({ b }: { b: ReturnType<typeof useBooking> }) {
  return (
    <FormField
      field={{
        name: 'client',
        label: 'Cliente',
        kind: 'choice',
        options: b.clients.map((c) => ({
          value: c.id,
          label: `${c.firstName} ${c.lastName}`,
        })),
      }}
      value={b.clientId}
      onChange={b.chooseClient}
    />
  );
}
