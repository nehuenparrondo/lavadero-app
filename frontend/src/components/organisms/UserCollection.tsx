import { useUsers } from '../../hooks/useUsers';
import { CollectionState } from './CollectionState';
import { UserTable } from './UserTable';
/** Presenta la página autorizada de usuarios y los estados de consulta.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de UserCollection con el contrato de propiedades declarado.
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
