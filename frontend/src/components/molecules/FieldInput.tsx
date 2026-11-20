import type { FormFieldDefinition } from '../../types/form';
import { DateInput } from './DateInput';
import { Input } from '../atoms/Input';
/** Ajusta teclado y privacidad según el tipo semántico del campo.
 * @param props - Propiedades tipadas: field, value, onChange, onBlur.
 * @returns Vista de FieldInput con el contrato de propiedades declarado.
 */
export function FieldInput({
  field,
  value,
  onChange,
  onBlur,
}: {
  field: FormFieldDefinition;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (() => void) | undefined;
}) {
  if (field.kind === 'date')
    return <DateInput label={field.label} value={value} onChange={onChange} onBlur={onBlur} />;
  return (
    <Input
      accessibilityLabel={field.label}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      placeholder={field.placeholder ?? ''}
      multiline={field.kind === 'textarea'}
      maxLength={field.maxLength}
      style={
        field.kind === 'textarea' ? { minHeight: 105, textAlignVertical: 'top' } : undefined
      }
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
  );
}
