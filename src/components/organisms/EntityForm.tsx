import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import type { FormFieldDefinition } from '../../types/form';
import { buildFormSchema } from '../../utils/buildFormSchema';
import { Button } from '../atoms/Button';
import { ControlledField } from '../molecules/ControlledField';
/** Formulario RHF + Zod con errores por campo y callback sin HTTP propio.
 * @param props - Propiedades tipadas: fields, initialValues, onSubmit, busy, submitLabel. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
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
        <ControlledField key={field.name} field={field} control={control} />
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
