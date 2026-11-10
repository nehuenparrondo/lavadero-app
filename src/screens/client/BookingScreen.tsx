import { Button } from '../../components/atoms/Button';
import { FormField } from '../../components/molecules/FormField';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { BookingClientField } from '../../components/organisms/BookingClientField';
import { BookingServicesField } from '../../components/organisms/BookingServicesField';
import { BookingTypeField } from '../../components/organisms/BookingTypeField';
import { ScheduleSelector } from '../../components/organisms/ScheduleSelector';
import { Screen } from '../../components/organisms/Screen';
import { Text } from '../../components/atoms/Text';
import { bookingDateMessage } from '../../utils/bookingAvailability';
import { useBooking } from '../../hooks/useBooking';
/** Selección de vehículo, servicios, fecha y horario con total antes de confirmar.
 * @returns Vista de BookingScreen con el contrato de propiedades declarado.
 */
export function BookingScreen() {
  const b = useBooking();
  return (
    <Screen
      refreshing={b.optionsLoading}
      onRefresh={b.refresh}
      refreshInterval={10_000}
      onRevalidate={b.revalidateAvailability}
    >
      <SectionHeader
        title="Reservá tu lavado"
        subtitle="Elegí el tipo y el servicio. Cargá los datos del vehículo después de confirmar."
      />
      <Notice error={b.error || b.loadError} onRetry={b.refresh} />
      {b.admin && <BookingClientField b={b} />}
      <BookingTypeField b={b} />
      <BookingServicesField b={b} />
      <BookingDateField b={b} />
      <ScheduleSelector booking={b} />
      <Button
        label="Confirmar reserva"
        loading={b.busy}
        disabled={!b.canSubmit}
        onPress={() => {
          void b.submit();
        }}
      />
    </Screen>
  );
}

/** Agrupa la fecha con la orientación de atención para el día seleccionado. */
function BookingDateField({ b }: { b: ReturnType<typeof useBooking> }) {
  return (
    <>
      <FormField
        field={{ name: 'date', label: 'Fecha', kind: 'date', placeholder: 'AAAA-MM-DD' }}
        value={b.date}
        onChange={b.setDate}
      />
      <Text>{bookingDateMessage(b.date, b.settings)}</Text>
    </>
  );
}
