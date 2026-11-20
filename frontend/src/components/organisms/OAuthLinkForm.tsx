import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
/** Confirma la contraseña local una sola vez antes de unir ambas formas de ingreso.
 * @param props - Propiedades tipadas: onSubmit, busy, error.
 * @returns Vista de OAuthLinkForm con el contrato de propiedades declarado.
 */
export function OAuthLinkForm({
  onSubmit,
  busy,
  error,
}: {
  onSubmit: (v: Record<string, string>) => Promise<void>;
  busy: boolean;
  error: string;
}) {
  return (
    <>
      <Text>
        Ya existe una cuenta con ese correo. Confirmá su contraseña para vincular el ingreso
        social a tu mismo perfil.
      </Text>
      <Notice error={error} />
      <EntityForm
        fields={[
          {
            name: 'password',
            label: 'Contraseña de tu cuenta',
            kind: 'password',
            maxLength: 72,
          },
        ]}
        onSubmit={onSubmit}
        busy={busy}
        submitLabel="Vincular e ingresar"
      />
    </>
  );
}
