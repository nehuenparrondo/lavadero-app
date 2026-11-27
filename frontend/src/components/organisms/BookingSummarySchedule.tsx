import { View } from 'react-native';
import type { useBooking } from '../../hooks/useBooking';
import { useTheme } from '../../hooks/useTheme';
import { appointmentDate } from '../../utils/format';
import { Text } from '../atoms/Text';

/** Identifica el horario guardado; nunca anuncia que ya existe un turno antes de confirmar.
 * @param props Borrador, hora guardada y última disponibilidad del servidor.
 * @returns Estado accesible del horario que se enviará al confirmar la reserva.
 */
export function BookingSummarySchedule({ b }: { b: ReturnType<typeof useBooking> }) {
  const { colors } = useTheme();
  const available = b.availability.data?.slots.includes(b.slot);
  return (
    <View
      accessibilityLiveRegion="polite"
      style={{ gap: 8, padding: 16, borderRadius: 14, backgroundColor: colors.soft }}
    >
      <Text style={{ fontWeight: '700', color: colors.primary }}>
        {b.slot ? 'Horario guardado' : 'Falta guardar el horario'}
      </Text>
      <Text>
        {b.slot
          ? appointmentDate(b.slot)
          : 'Elegí la fecha y la hora, y tocá Guardar para agregarlas acá.'}
      </Text>
      {Boolean(b.slot) && !available && (
        <Text style={{ color: colors.danger }}>
          {b.availability.loading
            ? 'Verificando disponibilidad…'
            : 'Este horario debe verificarse otra vez. Elegí una hora disponible y guardala.'}
        </Text>
      )}
    </View>
  );
}
