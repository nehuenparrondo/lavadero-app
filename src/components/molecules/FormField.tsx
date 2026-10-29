import { View } from 'react-native';
import { Input } from '../atoms/Input';
import { Text } from '../atoms/Text';
import { ChoiceGroup } from './ChoiceGroup';
import type { FormFieldDefinition } from '../../types/form';
import { useTheme } from '../../hooks/useTheme';
/** Label, entrada y error, con selectors legibles para campos enumerados. */
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
        <Input
          accessibilityLabel={field.label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder={field.placeholder ?? ''}
          secureTextEntry={field.kind === 'password'}
          autoCapitalize={
            field.kind === 'email' || field.kind === 'password' ? 'none' : 'sentences'
          }
          autoCorrect={field.kind !== 'email' && field.kind !== 'password'}
          keyboardType={
            field.kind === 'email'
              ? 'email-address'
              : field.kind === 'number' || field.kind === 'money'
                ? 'decimal-pad'
                : 'default'
          }
        />
      )}
      {error && (
        <Text accessibilityLiveRegion="polite" style={{ fontSize: 13, color: colors.danger }}>
          {error}
        </Text>
      )}
    </View>
  );
}
