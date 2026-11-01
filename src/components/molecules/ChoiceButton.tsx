import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Choice } from '../../types/form';
import { Text } from '../atoms/Text';
/** Opción táctil con estado seleccionado accesible y contraste del tema.
 * @param props - Propiedades tipadas: option, selected, onPress. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function ChoiceButton({
  option,
  selected,
  onPress,
}: {
  option: Choice;
  selected: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        styles.button,
        {
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: selected ? colors.soft : colors.surface,
        },
      ]}
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
}
const styles = StyleSheet.create({
  button: {
    minHeight: 42,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
});
