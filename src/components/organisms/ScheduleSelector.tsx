import { View } from 'react-native';
import { ChoiceGroup } from '../molecules/ChoiceGroup';
import { Text } from '../atoms/Text';
import { LoadingState } from '../molecules/LoadingState';
import { Notice } from '../molecules/Notice';
import { Card } from '../molecules/Card';
import { money, slotTime } from '../../utils/format';
import type { useBooking } from '../../hooks/useBooking';
/** Horarios y total provienen del backend; no calcula precios en el cliente. */
export function ScheduleSelector({ booking: b }: { booking: ReturnType<typeof useBooking> }) {
  if (!b.vehicleId || !b.serviceIds) return null;
  return (
    <View style={{ gap: 16 }}>
      {b.availability.loading ? (
        <LoadingState label="Buscando horarios…" />
      ) : (
        <>
          <Notice
            error={b.availability.error}
            onRetry={() => {
              void b.availability.refresh();
            }}
          />
          {b.availability.data && (
            <>
              <Card>
                <Text style={{ fontSize: 24, fontWeight: '800' }}>
                  {money(b.availability.data.totalCents)}
                </Text>
                <Text>{b.availability.data.durationMinutes} minutos estimados · ARS</Text>
              </Card>
              <Text style={{ fontWeight: '700' }}>Elegí un horario</Text>
              {b.availability.data.slots.length ? (
                <ChoiceGroup
                  value={b.slot}
                  onChange={b.setSlot}
                  options={b.availability.data.slots.map((value) => ({
                    value,
                    label: slotTime(value),
                  }))}
                />
              ) : (
                <Text>No quedan horarios disponibles para esta fecha. Probá otro día.</Text>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
}
