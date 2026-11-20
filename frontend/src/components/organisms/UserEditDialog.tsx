import { useUsers } from '../../hooks/useUsers';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Comparte campos de creación y edición de cuentas administradas.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de UserEditDialog con el contrato de propiedades declarado.
 */
export function UserEditDialog({ m }: { m: ReturnType<typeof useUsers> }) {
  return (
    <ModalPanel
      visible={m.open}
      title={m.editing ? 'Editar usuario' : 'Crear usuario'}
      onClose={m.close}
    >
      <Notice error={m.error} />
      <EntityForm
        key={m.editing?.id ?? 'new'}
        fields={m.fields}
        initialValues={m.initialValues}
        onSubmit={m.save}
        busy={m.busy}
      />
    </ModalPanel>
  );
}
