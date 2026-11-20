import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Appointment } from '../../types/entities';
import { appointmentDate } from '../../utils/format';
import { Text } from '../atoms/Text';

/** Observación guardada con autor y fecha, diferenciada del campo para escribir otra.
 * @param props Nota devuelta por el servidor después de autorizar el turno.
 * @returns Texto completo con procedencia y momento de registro.
 */
export function AppointmentNote({
  note,
}: {
  note: NonNullable<Appointment['notes']>[number];
}) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        padding: 16,
        gap: 10,
        borderRadius: 14,
        backgroundColor: colors.subtle,
        borderLeftWidth: 3,
        borderColor: colors.primary,
      }}
    >
      <Text style={{ lineHeight: 23 }}>{note.body}</Text>
      <Text style={{ color: colors.muted, fontSize: 12, lineHeight: 19 }}>
        {note.authorName} · {appointmentDate(note.createdAt)}
      </Text>
    </View>
  );
}
