import { ScrollView, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useTimeWheel } from '../../hooks/useTimeWheel';
import { WHEEL_ROW_HEIGHT } from '../../constants/timeWheel';
import { WheelRow } from './WheelRow';
import { TimeWheelActions } from './TimeWheelActions';
import { timeWheelStyles as s } from '../../theme/timeWheel.styles';
import { Text } from '../atoms/Text';

/** Rueda de cinco filas con una hora central, operable por tacto, mouse y teclado.
 * @param props Opciones vigentes, selección y cambio controlados por la reserva.
 * @returns Selector que no ofrece horarios ocupados.
 */
export function TimeWheel({
  slots,
  value,
  onChange,
}: {
  slots: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const w = useTimeWheel(slots, value, onChange);
  const { colors } = useTheme();
  return (
    <View style={{ gap: 12 }}>
      <View
        style={[s.frame, { borderColor: colors.border, backgroundColor: colors.background }]}
      >
        <View pointerEvents="none" style={[s.highlight, { backgroundColor: colors.soft }]} />
        <WheelViewport w={w} />
      </View>
      <TimeWheelActions w={w} />
      <Text
        accessibilityLiveRegion="polite"
        style={{ textAlign: 'center', color: colors.muted }}
      >
        {value && slots.includes(value)
          ? `Horario elegido: ${w.label}`
          : 'Deslizá la rueda o tocá una hora para elegir.'}
      </Text>
    </View>
  );
}

/** La región desplazable recibe únicamente opciones de disponibilidad vigentes. */
function WheelViewport({ w }: { w: ReturnType<typeof useTimeWheel> }) {
  return (
    <ScrollView
      ref={w.ref}
      testID="time-wheel"
      style={s.scroll}
      contentContainerStyle={s.content}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={WHEEL_ROW_HEIGHT}
      decelerationRate="fast"
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      onScroll={(event) => w.settle(event.nativeEvent.contentOffset.y)}
    >
      {w.rows.map((row, index) => (
        <WheelRow
          key={row}
          value={row}
          selected={index === w.index}
          distance={Math.abs(index - w.index)}
          onPress={() => w.choose(index)}
        />
      ))}
    </ScrollView>
  );
}
