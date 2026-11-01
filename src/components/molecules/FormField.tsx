import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { FormFieldDefinition } from '../../types/form';
import { Text } from '../atoms/Text';
import { ChoiceGroup } from './ChoiceGroup';
import { FieldInput } from './FieldInput';
/** Label, entrada y error, con selectors legibles para campos enumerados.
 * @param props - Propiedades tipadas: field, value, onChange, onBlur, error. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function FormField({
  field,
  value,
  onChange,
  onBlur,
  error,
}: {
  field: FormFieldDefinition;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string | undefined;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontWeight: '600', fontSize: 14 }}>{field.label}</Text>
      {field.kind === 'choice' || field.kind === 'multiple' ? (
        <ChoiceGroup
          options={field.options ?? []}
          value={value}
          onChange={onChange}
          multiple={field.kind === 'multiple'}
        />
      ) : (
        <FieldInput field={field} value={value} onChange={onChange} onBlur={onBlur} />
      )}
      {error && (
        <Text accessibilityLiveRegion="polite" style={{ fontSize: 13, color: colors.danger }}>
          {error}
        </Text>
      )}
    </View>
  );
}
