import { Pressable, View } from 'react-native';
import { Text } from '../atoms/Text';
import { useTheme } from '../../hooks/useTheme';
/** Opción visible de un selector. */
export interface Choice {
  value: string;
  label: string;
}
/** Selector accesible de una o varias opciones; múltiples se serializan separados por coma. */
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
  const { colors } = useTheme();
  const choose = (next: string) => {
    if (!multiple) {
      onChange(next);
      return;
    }
    const selected = new Set(value.split(',').filter(Boolean));
    if (selected.has(next)) selected.delete(next);
    else selected.add(next);
    onChange([...selected].join(','));
  };
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {options.map((option) => {
        const selected = multiple
          ? value.split(',').includes(option.value)
          : value === option.value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => choose(option.value)}
            style={{
              minHeight: 42,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: selected ? colors.primary : colors.border,
              backgroundColor: selected ? colors.soft : colors.surface,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: selected ? '700' : '400',
                color: selected ? colors.primary : colors.text,
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
