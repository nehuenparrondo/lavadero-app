import { View } from 'react-native';
import type { useBooking } from '../../hooks/useBooking';
import { AvailableSlots } from '../molecules/AvailableSlots';
import { LoadingState } from '../molecules/LoadingState';
import { Notice } from '../molecules/Notice';
/** Horarios y total provienen del backend; no calcula precios en el cliente.
 * @param props - Propiedades tipadas: booking.
 * @returns Vista de ScheduleSelector con el contrato de propiedades declarado.
 */
export function ScheduleSelector({ booking: b }: { booking: ReturnType<typeof useBooking> }) {
  if (!b.vehicleTypeId || !b.serviceIds) return null;
  return (
    <View style={{ gap: 16 }}>
      {b.availability.loading && !b.availability.data ? (
        <LoadingState label="Buscando horarios…" />
      ) : (
        <>
          <Notice error={b.availability.error} onRetry={b.availability.refresh} />
          {b.availability.data && (
            <>
              {b.slot && !b.availability.data.slots.includes(b.slot) && (
                <Notice error="El horario que elegiste ya no está disponible. Elegí otro." />
              )}
              <AvailableSlots
                quote={b.availability.data}
                value={b.slot}
                onChange={b.setSlot}
              />
            </>
          )}
        </>
      )}
    </View>
  );
}
