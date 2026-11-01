import { useCatalog } from '../../hooks/useCatalog';
import { ServiceCard } from '../molecules/ServiceCard';
import { CollectionState } from './CollectionState';
import { ResponsiveGrid } from '../molecules/ResponsiveGrid';
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
  return (
    <CollectionState
      loading={c.list.loading}
      error={c.list.error}
      empty={!c.list.data?.length}
      emptyTitle="Todavía no hay servicios disponibles"
      onRetry={c.list.refresh}
    >
      <ResponsiveGrid>
        {c.list.data?.map((s) => (
          <ServiceCard
            key={s.id}
            service={s}
            typeId={typeId}
            {...(admin
              ? {
                  onEdit: () => c.edit(s),
                  onPrice: () => c.setPricing(s),
                  onDelete: () => c.setDeleting(s),
                }
              : {})}
          />
        ))}
      </ResponsiveGrid>
    </CollectionState>
  );
}
