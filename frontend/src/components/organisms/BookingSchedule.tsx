import type { useBooking } from '../../hooks/useBooking';
import { bookingDateMessage } from '../../utils/bookingAvailability';
import { Text } from '../atoms/Text';
import { BookingSection } from '../molecules/BookingSection';
import { FormField } from '../molecules/FormField';
import { ScheduleSelector } from './ScheduleSelector';

/** Ofrece calendario y rueda sobre una sola cotización vigente.
 * @param props Estado coordinado de la reserva.
 * @returns Segundo paso con horarios libres y explicación de atención.
 */
export function BookingSchedule({ b }: { b: ReturnType<typeof useBooking> }) {
  return (
    <BookingSection number="2" title="Elegí cuándo venir">
      <FormField
        field={{ name: 'date', label: 'Fecha', kind: 'date' }}
        value={b.date}
        onChange={b.setDate}
      />
      <Text>{bookingDateMessage(b.date, b.settings)}</Text>
      {!b.serviceIds && <Text>Elegí los servicios para ver los horarios disponibles.</Text>}
      <ScheduleSelector booking={b} />
    </BookingSection>
  );
}
