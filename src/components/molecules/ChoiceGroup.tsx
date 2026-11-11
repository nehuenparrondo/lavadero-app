import { useState } from 'react';
import { View } from 'react-native';
import type { Choice } from '../../types/form';
import { toggleChoice } from '../../utils/toggleChoice';
import { ChoiceButton } from './ChoiceButton';
export type { Choice } from '../../types/form';
/** Selector simple o múltiple; delega apariencia y transformación en piezas independientes.
 * @param props - Propiedades tipadas: options, value, onChange, multiple.
 * @returns Vista de ChoiceGroup con el contrato de propiedades declarado.
 */
export function ChoiceGroup({
  options,
  value,
  onChange,
  multiple = false,
}: {
  options: Choice[];
  value: string;
  onChange: (value: string) => void;
  multiple?: boolean;
}) {
  const [width, setWidth] = useState(0);
  const columns = Math.min(options.length || 1, width >= 600 ? 3 : 2);
  const itemWidth = width ? (width - (columns - 1) * 8) / columns : '100%';
  return (
    <View
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'stretch' }}
    >
      {options.map((option) => (
        <View key={option.value} style={{ width: itemWidth }}>
          <ChoiceButton
            option={option}
            selected={
              multiple ? value.split(',').includes(option.value) : value === option.value
            }
            onPress={() => onChange(toggleChoice(value, option.value, multiple))}
          />
        </View>
      ))}
    </View>
  );
}
