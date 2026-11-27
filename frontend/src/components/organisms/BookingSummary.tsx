import type { useBooking } from '../../hooks/useBooking';
import { useTheme } from '../../hooks/useTheme';
import { money } from '../../utils/format';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { BookingSummarySchedule } from './BookingSummarySchedule';

/** Confirma únicamente una cotización y un horario que siguen vigentes.
 * @param props Estado de la reserva, sin calcular importes fuera del servidor.
 * @returns Resumen visible antes de reservar y siguiente paso explicado.
 */
export function BookingSummary({ b }: { b: ReturnType<typeof useBooking> }) {
  const { colors } = useTheme();
  return (
    <Card style={{ borderColor: colors.primary }}>
      <Text accessibilityRole="header" style={{ fontSize: 20, fontWeight: '700' }}>
        Tu reserva
      </Text>
      <BookingQuote b={b} />
      <BookingSummarySchedule b={b} />
      <Button
        label="Confirmar reserva"
        loading={b.busy}
        disabled={!b.canSubmit}
        onPress={() => {
          void b.submit();
        }}
      />
      <Text style={{ fontSize: 13, lineHeight: 21, color: colors.muted }}>
        Al confirmar guardamos tu turno. Después agregás la patente y los datos del vehículo.
      </Text>
    </Card>
  );
}

/** Presenta las tarifas del servidor junto con la selección que las originó. */
function BookingQuote({ b }: { b: ReturnType<typeof useBooking> }) {
  const { colors } = useTheme();
  const quote = b.availability.data;
  const selected = [...b.washes, ...b.extras].filter((s) =>
    b.serviceIds.split(',').includes(s.id),
  );
  return (
    <>
      <Text>{b.types.find((t) => t.id === b.vehicleTypeId)?.name ?? 'Elegí tu vehículo'}</Text>
      {selected.map((service) => (
        <Text key={service.id}>✓ {service.name}</Text>
      ))}
      <Text style={{ fontSize: 32, fontWeight: '800', color: colors.primary }}>
        {quote ? money(quote.totalCents) : '—'}
      </Text>
      <Text style={{ color: colors.muted }}>
        {quote
          ? `${quote.durationMinutes} minutos estimados · ARS`
          : 'El total aparece al elegir tus servicios.'}
      </Text>
    </>
  );
}
