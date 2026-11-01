import { useBooking } from '../../hooks/useBooking';
import { FormField } from '../molecules/FormField';
/** Selecciona titular para una reserva asistida por administración.
 * @param props - Propiedades tipadas: b.
 * @returns Vista de BookingClientField con el contrato de propiedades declarado.
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
