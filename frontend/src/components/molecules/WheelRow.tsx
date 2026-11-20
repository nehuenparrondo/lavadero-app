import { Pressable } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { timeWheelStyles as s } from '../../theme/timeWheel.styles';
import { slotTime } from '../../utils/format';
import { Text } from '../atoms/Text';

/** Una fila mantiene el tamaño táctil aunque la letra periférica se atenúe.
 * @param props Hora y estado de selección.
 * @returns Fila elegible con contraste central.
 */
export function WheelRow({
  value,
  selected,
  distance,
  onPress,
}: {
  value: string;
  selected: boolean;
  distance: number;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={value ? `Elegir ${slotTime(value)}` : 'Elegir horario'}
      accessibilityState={{ selected }}
      style={s.row}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: selected ? 24 : 19,
          fontWeight: selected ? '800' : '500',
          color: selected ? colors.primary : colors.muted,
          opacity: distance > 1 ? 0.5 : 1,
        }}
      >
        {value ? slotTime(value) : 'Elegí un horario'}
      </Text>
    </Pressable>
  );
}
