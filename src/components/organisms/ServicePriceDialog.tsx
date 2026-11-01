import type { useCatalog } from '../../hooks/useCatalog';
import { priceFields } from '../../utils/catalogFields';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Presenta service price dialog con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: c. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function ServicePriceDialog({ c }: { c: ReturnType<typeof useCatalog> }) {
  return (
    <ModalPanel
      visible={Boolean(c.pricing)}
      title={`Precios · ${c.pricing?.name ?? ''}`}
      onClose={() => c.setPricing(null)}
    >
      <Notice error={c.action.error} />
      <EntityForm
        key={c.pricing?.id ?? 'price'}
        fields={priceFields(c.types.data ?? [])}
        onSubmit={c.savePrice}
        busy={c.action.busy}
      />
    </ModalPanel>
  );
}
