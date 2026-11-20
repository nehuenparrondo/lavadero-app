import { View } from 'react-native';
import { CompactIconButton } from '../atoms/CompactIconButton';
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
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={{ transform: [{ rotate: '180deg' }] }}>
        <CompactIconButton
          icon="chevron"
          label="Mes anterior"
          onPress={() => onChange(shiftMonth(month, -1))}
        />
      </View>
      <Text
        style={{ flex: 1, minWidth: 0, textAlign: 'center', fontWeight: '700', fontSize: 18 }}
      >
        {label}
      </Text>
      <CompactIconButton
        icon="chevron"
        label="Mes siguiente"
        onPress={() => onChange(shiftMonth(month, 1))}
      />
    </View>
  );
}
