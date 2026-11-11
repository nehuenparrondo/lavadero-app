import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Choice } from '../../types/form';
import { Text } from '../atoms/Text';
/** Opción táctil con estado seleccionado accesible y contraste del tema.
 * @param props - Propiedades tipadas: option, selected, onPress.
 * @returns Vista de ChoiceButton con el contrato de propiedades declarado.
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
      accessibilityLabel={option.label}
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
      <ChoiceCopy option={option} selected={selected} />
    </Pressable>
  );
}
/** Texto principal y tarifa mantienen la misma jerarquía en todas las opciones. */
function ChoiceCopy({ option, selected }: { option: Choice; selected: boolean }) {
  const { colors } = useTheme();
  return (
    <>
      <Text
        style={{
          fontSize: 14,
          lineHeight: 20,
          textAlign: 'center',
          fontWeight: '700',
          color: selected ? colors.primary : colors.text,
        }}
      >
        {option.label}
      </Text>
      {option.description && (
        <Text
          style={{ fontSize: 12, lineHeight: 18, textAlign: 'center', color: colors.muted }}
        >
          {option.description}
        </Text>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    minHeight: 68,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
});
