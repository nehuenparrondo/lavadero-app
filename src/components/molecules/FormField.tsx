import { View } from 'react-native';
import type { FormFieldDefinition } from '../../types/form';
import { Text } from '../atoms/Text';
import { ChoiceGroup } from './ChoiceGroup';
import { FieldInput } from './FieldInput';
import { FormFieldFeedback } from './FormFieldFeedback';
/** Label, entrada y error, con selectors legibles para campos enumerados.
 * @param props - Propiedades tipadas: field, value, onChange, onBlur, error.
 * @returns Vista de FormField con el contrato de propiedades declarado.
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
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontWeight: '700', fontSize: 13 }}>
        {field.label}
        {field.required === false ? '' : ' *'}
      </Text>
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
      <FormFieldFeedback field={field} value={value} error={error} />
    </View>
  );
}
