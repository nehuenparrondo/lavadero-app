import type { Availability } from '../../types/entities';
import { emptyAvailability } from '../../utils/bookingAvailability';
import { Text } from '../atoms/Text';
import { TimeWheel } from './TimeWheel';
/** Horarios ya validados por el servidor y estado vacío cuando la fecha está completa.
 * @param props - Propiedades tipadas: quote, value, onChange.
 * @returns Vista de AvailableSlots con el contrato de propiedades declarado.
 */
export function AvailableSlots({
  quote,
  value,
  onChange,
}: {
  quote: Availability;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <>
      <Text style={{ fontWeight: '700' }}>Elegí un horario</Text>
      {quote.slots.length ? (
        <TimeWheel value={value} onChange={onChange} slots={quote.slots} />
      ) : (
        <Text>{emptyAvailability(quote.unavailableReason)}</Text>
      )}
    </>
  );
}
