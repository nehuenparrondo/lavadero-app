import { TextInput, StyleSheet } from 'react-native';
import type { TextInputProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
/** Entrada controlada accesible, con tema y altura táctil suficiente. */
export function Input(props: TextInputProps) {
  const { colors } = useTheme();
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.muted}
      style={[
        styles.input,
        { color: colors.text, borderColor: colors.border, backgroundColor: colors.surface },
        props.style,
      ]}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
});
