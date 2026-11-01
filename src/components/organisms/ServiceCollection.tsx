import { useCatalog } from '../../hooks/useCatalog';
import { ServiceCard } from '../molecules/ServiceCard';
import { CollectionState } from './CollectionState';
/** Presenta service collection con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: c, admin, typeId. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
    </CollectionState>
  );
}
