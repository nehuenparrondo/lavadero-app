import { View } from 'react-native';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { shiftMonth } from '../../utils/calendar';
/** Cambia el mes visible sin modificar la fecha del formulario.
 * @param props Mes ISO y cambio del mes visible.
 * @returns Navegación anterior/siguiente y título del mes.
 */
export function CalendarNavigation({
  month,
  onChange,
}: {
  month: string;
  onChange: (month: string) => void;
}) {
  const label = new Intl.DateTimeFormat('es-AR', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${month}-01T12:00:00Z`));
  return (
    <View style={{ gap: 12 }}>
      <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 20 }}>{label}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
        <Button
          label="Mes anterior"
          variant="quiet"
          onPress={() => onChange(shiftMonth(month, -1))}
        />
        <Button
          label="Mes siguiente"
          variant="quiet"
          onPress={() => onChange(shiftMonth(month, 1))}
        />
      </View>
    </View>
  );
}
