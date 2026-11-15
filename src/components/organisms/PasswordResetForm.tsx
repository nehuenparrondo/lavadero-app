import { EntityForm } from './EntityForm';
import { resetFields } from '../../constants/recoveryFields';
/** Campos de confirmación separados de la navegación y del enlace privado.
 * @param props - Estado de envío y acción validada por el hook.
 * @returns Formulario de nueva contraseña sin HTTP propio.
 */
export function PasswordResetForm({
  submit,
  busy,
}: {
  submit: (values: Record<string, string>) => Promise<void>;
  busy: boolean;
}) {
  return (
    <EntityForm
      fields={resetFields}
      onSubmit={submit}
      busy={busy}
      submitLabel="Guardar nueva contraseña"
    />
  );
}
