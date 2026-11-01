import type { FormFieldDefinition } from '../../types/form';
import { Input } from '../atoms/Input';
/** Ajusta teclado y privacidad según el tipo semántico del campo.
 * @param props - Propiedades tipadas: field, value, onChange, onBlur. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
  return (
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
  );
}
