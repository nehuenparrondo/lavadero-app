import { useRouter } from 'expo-router';
import type { useWalkIn } from '../../hooks/useWalkIn';
import { money, slotTime } from '../../utils/format';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';

/** Distingue la estimación de disponibilidad del turno ya guardado.
 * @param props Estado del registro rápido.
 * @returns Resumen con importe real y acciones de confirmación o siguiente ingreso.
 */
export function WalkInConfirmation({ m }: { m: ReturnType<typeof useWalkIn> }) {
  return m.result ? <SavedWalkIn m={m} /> : <PendingWalkIn m={m} />;
}

/** Muestra el ingreso persistido. */
function SavedWalkIn({ m }: { m: ReturnType<typeof useWalkIn> }) {
  const router = useRouter();
  return (
    <Card>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Ingreso confirmado</Text>
      <Text>
        {m.result!.plate} · Hoy a las {slotTime(m.result!.startsAt)}
      </Text>
      <Text>
        {m.result!.serviceSummary} · {money(m.result!.totalCents)}
      </Text>
      <Text>
        El equipo ya puede verlo en Turnos. Los datos y las observaciones quedaron guardados.
      </Text>
      <Button label="Ver turno" onPress={() => router.push(`/appointment/${m.result!.id}`)} />
      <Button label="Registrar otro auto" variant="secondary" onPress={m.reset} />
    </Card>
  );
}

/** Confirma la llegada con lugar disponible. */
function PendingWalkIn({ m }: { m: ReturnType<typeof useWalkIn> }) {
  const quote = m.availability.data;
  return (
    <Card>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>3. Registrar la llegada</Text>
      <WalkInQuote m={m} />
      <Text>
        Se asignará el primer horario libre de hoy, respetando los turnos ya reservados.
      </Text>
      {quote?.unavailableReason === 'closed' && (
        <Text>
          Hoy el lavadero está cerrado. Los ingresos sin turno se registran durante la jornada
          laboral.
        </Text>
      )}
      <Button
        label="Registrar auto sin turno"
        icon="plus"
        loading={m.action.busy}
        disabled={
          !m.ready || !m.details.plate.trim() || !quote?.slots.length || m.availability.loading
        }
        onPress={() => {
          void m.save();
        }}
      />
    </Card>
  );
}

/** Presenta la tarifa y el primer horario estimado. */
function WalkInQuote({ m }: { m: ReturnType<typeof useWalkIn> }) {
  const quote = m.availability.data;
  if (!m.ready || !quote) return null;
  return (
    <Text>
      {money(quote.totalCents)} · {quote.durationMinutes} min ·{' '}
      {quote.slots[0]
        ? `Primer lugar estimado: ${slotTime(quote.slots[0])}`
        : 'No queda disponibilidad para hoy.'}
    </Text>
  );
}
