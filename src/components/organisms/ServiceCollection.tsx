import { useCatalog } from '../../hooks/useCatalog';
import { ServiceCard } from '../molecules/ServiceCard';
import { CollectionState } from './CollectionState';
import { ResponsiveGrid } from '../molecules/ResponsiveGrid';
import { supportsVehicleType } from '../../utils/vehicleTypePricing';
import type { Service } from '../../types/entities';
/** Cuadrícula de catálogo con acciones administrativas cuando están habilitadas.
 * @param props - Propiedades tipadas: c, admin, typeId.
 * @returns Vista de ServiceCollection con el contrato de propiedades declarado.
 */
export function ServiceCollection({
  c,
  admin,
  typeId,
}: {
  c: ReturnType<typeof useCatalog>;
  admin: boolean;
  typeId: string;
}) {
  const typeCode = c.types.data?.find((t) => t.id === typeId)?.code;
  const items = c.list.data?.filter(
    (s) =>
      supportsVehicleType(typeCode, s) &&
      (admin || s.prices.some((p) => p.vehicleTypeId === typeId)),
  );
  return (
    <CollectionState
      loading={c.list.loading}
      error={c.list.error}
      empty={!items?.length}
      emptyTitle="Todavía no hay servicios disponibles"
      onRetry={c.list.refresh}
    >
      <ResponsiveGrid>
        {items?.map((s) => (
          <ServiceCard
            key={s.id}
            service={s}
            typeId={typeId}
            {...(admin && serviceActions(c, s))}
          />
        ))}
      </ResponsiveGrid>
    </CollectionState>
  );
}

/** Conecta la edición y los precios al catálogo seleccionado. */
function serviceActions(c: ReturnType<typeof useCatalog>, service: Service) {
  return {
    onEdit: () => c.edit(service),
    onPrice: () => c.setPricing(service),
    onDelete: () => c.setDeleting(service),
  };
}
