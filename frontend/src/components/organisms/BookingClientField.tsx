import { useBooking } from '../../hooks/useBooking';
import { Text } from '../atoms/Text';
import { FormField } from '../molecules/FormField';
/** Selecciona titular para una reserva asistida por administración.
 * @param props - Propiedades tipadas: b.
 * @returns Vista de BookingClientField con el contrato de propiedades declarado.
 */
export function BookingClientField({ b }: { b: ReturnType<typeof useBooking> }) {
  if (b.optionsLoading) return null;
  if (!b.clients.length)
    return (
      <Text>
        Todavía no hay clientes activos para reservar. Registrá uno desde Clientes y equipo.
      </Text>
    );
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
