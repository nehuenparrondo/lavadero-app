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
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {options.map((option) => (
        <ChoiceButton
          key={option.value}
          option={option}
          selected={
            multiple ? value.split(',').includes(option.value) : value === option.value
          }
          onPress={() => onChange(toggleChoice(value, option.value, multiple))}
        />
      ))}
    </View>
  );
}
