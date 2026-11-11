import { View } from 'react-native';
import { BookingSection } from '../../components/molecules/BookingSection';
import { Notice } from '../../components/molecules/Notice';
import { OverviewColumns } from '../../components/molecules/OverviewColumns';
import { PageHeading } from '../../components/molecules/PageHeading';
import { BookingClientField } from '../../components/organisms/BookingClientField';
import { BookingSchedule } from '../../components/organisms/BookingSchedule';
import { BookingServicesField } from '../../components/organisms/BookingServicesField';
import { BookingSummary } from '../../components/organisms/BookingSummary';
import { BookingTypeField } from '../../components/organisms/BookingTypeField';
import { Screen } from '../../components/organisms/Screen';
import { useBooking } from '../../hooks/useBooking';

/** Reserva por pasos, con servicios separados y total siempre verificable.
 * @returns Formulario adaptable que solicita el vehículo particular después de reservar.
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
      <PageHeading
        eyebrow="Nueva visita"
        title="Reservá tu lavado"
        detail="Elegí el servicio y un horario libre. Los datos del vehículo van después."
      />
      <Notice error={b.error || b.loadError} onRetry={b.refresh} />
      {b.admin && <BookingClientField b={b} />}
      <OverviewColumns
        primary={<BookingDetails b={b} />}
        secondary={<BookingSummary b={b} />}
      />
    </Screen>
  );
}

/** Mantiene juntos los controles de cada paso antes del resumen final. */
function BookingDetails({ b }: { b: ReturnType<typeof useBooking> }) {
  return (
    <View style={{ gap: 20 }}>
      <BookingSection number="1" title="Elegí cómo cuidarlo">
        <BookingTypeField b={b} />
        <BookingServicesField b={b} />
      </BookingSection>
      <BookingSchedule b={b} />
    </View>
  );
}
