import type { Availability } from '../../types/entities';
import { emptyAvailability } from '../../utils/bookingAvailability';
import { slotTime } from '../../utils/format';
import { Text } from '../atoms/Text';
import { ChoiceGroup } from './ChoiceGroup';
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
        <ChoiceGroup
          value={value}
          onChange={onChange}
          options={quote.slots.map((value) => ({ value, label: slotTime(value) }))}
        />
      ) : (
        <Text>{emptyAvailability(quote.unavailableReason)}</Text>
      )}
    </>
  );
}
