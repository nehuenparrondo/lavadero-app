import type { Availability } from '../../types/entities';
import { slotTime } from '../../utils/format';
import { Text } from '../atoms/Text';
import { ChoiceGroup } from './ChoiceGroup';
/** Horarios ya validados por el servidor y estado vacío cuando la fecha está completa.
 * @param props - Propiedades tipadas: quote, value, onChange. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
        <Text>No quedan horarios disponibles para esta fecha. Probá otro día.</Text>
      )}
    </>
  );
}
