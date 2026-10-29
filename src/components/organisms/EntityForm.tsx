import { useMemo } from 'react';
import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FormFieldDefinition } from '../../types/form';
import { buildFormSchema } from '../../utils/buildFormSchema';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
/** Formulario RHF + Zod con errores por campo y callback sin HTTP propio. */
export function EntityForm({
  fields,
  initialValues = {},
  onSubmit,
  busy = false,
  submitLabel = 'Guardar',
}: {
  fields: FormFieldDefinition[];
  initialValues?: Record<string, string>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
  busy?: boolean;
  submitLabel?: string;
}) {
  const schema = useMemo(() => buildFormSchema(fields), [fields]);
  const defaults = Object.fromEntries(
    fields.map((f) => [f.name, initialValues[f.name] ?? '']),
  );
  const { control, handleSubmit } = useForm<Record<string, string>>({
    defaultValues: defaults,
    resolver: zodResolver(schema),
  });
  return (
    <View style={{ gap: 16 }}>
      {fields.map((field) => (
        <Controller
          key={field.name}
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
      ))}
      <Button
        label={submitLabel}
        loading={busy}
        onPress={() => {
          void handleSubmit(onSubmit)();
        }}
      />
    </View>
  );
}
