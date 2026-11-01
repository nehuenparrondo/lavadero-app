import { useUsers } from '../../hooks/useUsers';
import { CollectionState } from './CollectionState';
import { UserTable } from './UserTable';
/** Presenta user collection con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function UserCollection({ m }: { m: ReturnType<typeof useUsers> }) {
  return (
    <CollectionState
      loading={m.loading}
      error={m.fetchError}
      empty={!m.data?.items.length}
      emptyTitle="No hay usuarios con estos filtros"
      onRetry={m.refresh}
    >
      <UserTable users={m.data?.items ?? []} onEdit={m.edit} onDelete={m.requestDelete} />
    </CollectionState>
  );
}
