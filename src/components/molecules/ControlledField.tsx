import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { FormFieldDefinition } from '../../types/form';
import { FormField } from './FormField';
/** Adapta un campo RHF a la molécula de entrada, incluyendo errores y blur.
 * @param props - Propiedades tipadas: field, control. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function ControlledField({
  field,
  control,
}: {
  field: FormFieldDefinition;
  control: Control<Record<string, string>>;
}) {
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: binding, fieldState }) => (
        <FormField
          field={field}
          value={binding.value ?? ''}
          onChange={binding.onChange}
          onBlur={binding.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}
