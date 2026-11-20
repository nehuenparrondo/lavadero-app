import type { TextInputProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useInputFocus } from '../../hooks/useInputFocus';
/** Entrada controlada accesible, con tema y altura táctil suficiente.
 * @param props - Propiedades de presentación; mantiene el contrato nativo cuando corresponde.
 * @returns Vista de Input con el contrato de propiedades declarado.
 */
export function Input(props: TextInputProps) {
  const { colors } = useTheme();
  const focus = useInputFocus(props);
  return (
    <TextInput
      {...props}
      onFocus={focus.onFocus}
      onBlur={focus.onBlur}
      underlineColorAndroid="transparent"
      placeholderTextColor={colors.muted}
      style={[
        styles.input,
        {
          color: colors.text,
          borderColor: focus.focused ? colors.primary : colors.border,
          backgroundColor: focus.focused ? colors.surface : colors.subtle,
        },
        props.style,
      ]}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    outlineWidth: 0,
    borderRadius: 14,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
});
