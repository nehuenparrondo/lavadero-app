import type { useCatalog } from '../../hooks/useCatalog';
import { ServiceDeleteDialog } from './ServiceDeleteDialog';
import { ServiceEditDialog } from './ServiceEditDialog';
import { ServicePriceDialog } from './ServicePriceDialog';
/** Edición de servicio, tarifa por tipo y confirmación de baja lógica.
 * @param props - Propiedades tipadas: catalog.
 * @returns Vista de ServiceEditors con el contrato de propiedades declarado.
 */
export function ServiceEditors({ catalog: c }: { catalog: ReturnType<typeof useCatalog> }) {
  return (
    <>
      <ServiceEditDialog c={c} />
      <ServicePriceDialog c={c} />
      <ServiceDeleteDialog c={c} />
    </>
  );
}
