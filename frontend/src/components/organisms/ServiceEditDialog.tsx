import type { useCatalog } from '../../hooks/useCatalog';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Edita descripción y duración del servicio, separadas de sus precios.
 * @param props - Propiedades tipadas: c.
 * @returns Vista de ServiceEditDialog con el contrato de propiedades declarado.
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
