import { useTheme } from '../../hooks/useTheme';
import type { FormFieldDefinition } from '../../types/form';
import { Text } from '../atoms/Text';

/** Ayuda de escritura y validación sin anunciar cada carácter a lectores de pantalla.
 * @param props Contrato del campo, texto actual y error de validación opcional.
 * @returns Contador en textos largos y error recuperable, cuando correspondan.
 */
export function FormFieldFeedback({
  field,
  value,
  error,
}: {
  field: FormFieldDefinition;
  value: string;
  error?: string | undefined;
}) {
  const { colors } = useTheme();
  return (
    <>
      {field.kind === 'textarea' && field.maxLength && (
        <Text style={{ alignSelf: 'flex-end', fontSize: 12, color: colors.muted }}>
          {value.length} / {field.maxLength}
        </Text>
      )}
      {error && (
        <Text accessibilityLiveRegion="polite" style={{ fontSize: 13, color: colors.danger }}>
          {error}
        </Text>
      )}
    </>
  );
}
