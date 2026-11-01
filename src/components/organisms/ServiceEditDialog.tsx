import type { useCatalog } from '../../hooks/useCatalog';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Presenta service edit dialog con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: c. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function ServiceEditDialog({ c }: { c: ReturnType<typeof useCatalog> }) {
  return (
    <ModalPanel
      visible={c.open}
      title={c.editing ? 'Editar servicio' : 'Nuevo servicio'}
      onClose={c.close}
    >
      <Notice error={c.action.error} />
      <EntityForm
        key={c.editing?.id ?? 'new'}
        fields={c.fields}
        initialValues={c.initialValues}
        onSubmit={c.save}
        busy={c.action.busy}
      />
    </ModalPanel>
  );
}
