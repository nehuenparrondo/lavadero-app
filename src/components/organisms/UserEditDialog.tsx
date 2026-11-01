import { useUsers } from '../../hooks/useUsers';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Presenta user edit dialog con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
