import { Pressable, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { calendarLabel } from '../../utils/calendar';
import { Text } from '../atoms/Text';
/** Celda táctil del calendario o espacio vacío de la semana.
 * @param props Fecha ISO, selección y receptor del día elegido.
 * @returns Botón con fecha completa y objetivo táctil de 44 puntos.
 */
export function CalendarDay({
  day,
  selected,
  onChange,
}: {
  day: string;
  selected: boolean;
  onChange: (day: string) => void;
}) {
  const { colors } = useTheme();
  if (!day) return <View style={{ minHeight: 44 }} />;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Elegir ${calendarLabel(day)}`}
      accessibilityState={{ selected }}
      onPress={() => onChange(day)}
      style={{
        minHeight: 44,
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: selected ? colors.primary : colors.soft,
      }}
    >
      <Text style={{ textAlign: 'center', color: selected ? colors.onPrimary : colors.text }}>
        {Number(day.slice(-2))}
      </Text>
    </Pressable>
  );
}
