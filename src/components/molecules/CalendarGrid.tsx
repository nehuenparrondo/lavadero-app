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
  const days = calendarDays(month);
  const weeks = Array.from({ length: 6 }, (_, week) =>
    days.slice(week * 7, week * 7 + 7),
  ).filter((week) => week.some(Boolean));
  return (
    <View style={{ gap: 2 }}>
      <View style={{ flexDirection: 'row' }}>
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => (
          <Text
            key={i}
            style={{ flex: 1, minWidth: 0, textAlign: 'center', paddingVertical: 8 }}
          >
            {day}
          </Text>
        ))}
      </View>
      {weeks.map((week, index) => (
        <CalendarWeek key={index} days={week} value={value} onChange={onChange} />
      ))}
    </View>
  );
}

/** Mantiene siete columnas iguales sin desbordes por redondeo de porcentajes. */
function CalendarWeek({
  days,
  value,
  onChange,
}: {
  days: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {days.map((day, i) => (
        <View key={i} style={{ flex: 1, minWidth: 0, padding: 2 }}>
          <CalendarDay day={day} selected={day === value} onChange={onChange} />
        </View>
      ))}
    </View>
  );
}
