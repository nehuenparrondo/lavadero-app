import type { useCatalog } from '../../hooks/useCatalog';
import { priceFields } from '../../utils/catalogFields';
import { supportsVehicleType } from '../../utils/vehicleTypePricing';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Edita una tarifa para la pareja servicio/tipo de vehículo.
 * @param props - Propiedades tipadas: c.
 * @returns Vista de ServicePriceDialog con el contrato de propiedades declarado.
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
        fields={priceFields(
          (c.types.data ?? []).filter(
            (t) => !c.pricing || supportsVehicleType(t.code, c.pricing),
          ),
        )}
        onSubmit={c.savePrice}
        busy={c.action.busy}
      />
    </ModalPanel>
  );
}
