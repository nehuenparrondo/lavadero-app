import { useTheme } from '../../hooks/useTheme';
import type { Appointment } from '../../types/entities';
import { Text } from '../atoms/Text';
import { Card } from './Card';

/** Conserva el motivo visible en el detalle, incluso después de leer el aviso de Inicio.
 * @param props Turno autorizado por el servidor, con motivo y autor de cancelación.
 * @returns Contexto de cancelación o nada para los demás estados.
 */
export function AppointmentCancellation({ appointment }: { appointment: Appointment }) {
  const { colors } = useTheme();
  if (appointment.status !== 'cancelled') return null;
  return (
    <Card style={{ backgroundColor: colors.dangerSoft, borderColor: colors.danger }}>
      <Text accessibilityRole="header" style={{ fontSize: 18, fontWeight: '700' }}>
        Motivo de cancelación
      </Text>
      <Text style={{ lineHeight: 23 }}>
        {appointment.cancellationReason ||
          'Esta cancelación anterior no tiene un motivo registrado.'}
      </Text>
      {appointment.cancelledByName && (
        <Text style={{ color: colors.muted, fontSize: 13 }}>
          Registrado por {appointment.cancelledByName}
        </Text>
      )}
    </Card>
  );
}
