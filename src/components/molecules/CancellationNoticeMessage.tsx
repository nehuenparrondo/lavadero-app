import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { CancellationNotice } from '../../types/cancellation';
import { appointmentDate } from '../../utils/format';
import { Text } from '../atoms/Text';
import { StatusBadge } from './StatusBadge';

/** Explica qué reserva cambió y conserva el motivo completo, sin abreviarlo.
 * @param props Aviso recibido desde la consulta propia del cliente.
 * @returns Mensaje semántico con fecha, vehículo y alternativa para volver a reservar.
 */
export function CancellationNoticeMessage({ notice }: { notice: CancellationNotice }) {
  const { colors } = useTheme();
  return (
    <View accessibilityLiveRegion="polite" style={{ gap: 10 }}>
      <StatusBadge status="cancelled" />
      <Text accessibilityRole="header" style={{ fontSize: 21, fontWeight: '800' }}>
        Tu turno fue cancelado
      </Text>
      <Text>
        {appointmentDate(notice.startsAt)} · {notice.plate ?? notice.vehicleType}
      </Text>
      <Text style={{ fontWeight: '700' }}>Motivo del lavadero</Text>
      <Text style={{ lineHeight: 23 }}>
        {notice.reason || 'No se registró un motivo para esta cancelación anterior.'}
      </Text>
      <Text style={{ color: colors.muted, fontSize: 13 }}>
        Podés elegir otro horario desde Reservar turno.
      </Text>
    </View>
  );
}
