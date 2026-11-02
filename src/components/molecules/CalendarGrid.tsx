import { View } from 'react-native';
import { calendarDays } from '../../utils/calendar';
import { Text } from '../atoms/Text';
import { CalendarDay } from './CalendarDay';
/** Seis semanas de calendario, compartidas por web y dispositivos nativos.
 * @param props Mes visible, fecha actual y selección de día.
 * @returns Grilla de lunes a domingo con celdas accesibles.
 */
export function CalendarGrid({
  month,
  value,
  onChange,
}: {
  month: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => (
        <Text key={i} style={{ width: '14.285%', textAlign: 'center', paddingVertical: 8 }}>
          {day}
        </Text>
      ))}
      {calendarDays(month).map((day, i) => (
        <View key={i} style={{ width: '14.285%', padding: 2 }}>
          <CalendarDay day={day} selected={day === value} onChange={onChange} />
        </View>
      ))}
    </View>
  );
}
