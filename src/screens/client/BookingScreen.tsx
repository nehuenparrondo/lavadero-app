import { Button } from '../../components/atoms/Button';
import { FormField } from '../../components/molecules/FormField';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { BookingClientField } from '../../components/organisms/BookingClientField';
import { BookingServicesField } from '../../components/organisms/BookingServicesField';
import { BookingVehicleField } from '../../components/organisms/BookingVehicleField';
import { ScheduleSelector } from '../../components/organisms/ScheduleSelector';
import { Screen } from '../../components/organisms/Screen';
import { useBooking } from '../../hooks/useBooking';
/** Selección de vehículo, servicios, fecha y horario con total antes de confirmar.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function BookingScreen() {
  const b = useBooking();
  return (
    <Screen>
      <SectionHeader
        title="Reservá tu lavado"
        subtitle="Elegí los detalles. Nosotros nos ocupamos del resto."
      />
      <Notice error={b.error || b.loadError} />
      {b.admin && <BookingClientField b={b} />}
      <BookingVehicleField b={b} />
      <BookingServicesField b={b} />
      <FormField
        field={{ name: 'date', label: 'Fecha', kind: 'date', placeholder: 'AAAA-MM-DD' }}
        value={b.date}
        onChange={b.setDate}
      />
      <ScheduleSelector booking={b} />
      <Button
        label="Confirmar reserva"
        loading={b.busy}
        disabled={!b.slot || b.availability.loading}
        onPress={() => {
          void b.submit();
        }}
      />
    </Screen>
  );
}
