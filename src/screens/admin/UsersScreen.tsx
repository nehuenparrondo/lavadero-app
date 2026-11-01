import { Button } from '../../components/atoms/Button';
import { Notice } from '../../components/molecules/Notice';
import { Pagination } from '../../components/molecules/Pagination';
import { SearchBar } from '../../components/molecules/SearchBar';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Screen } from '../../components/organisms/Screen';
import { UserCollection } from '../../components/organisms/UserCollection';
import { UserDeleteDialog } from '../../components/organisms/UserDeleteDialog';
import { UserEditDialog } from '../../components/organisms/UserEditDialog';
import { UserRoleFilter } from '../../components/organisms/UserRoleFilter';
import { useUsers } from '../../hooks/useUsers';
/** ABML de usuarios con filtros y cambios de rol reservados al administrador.
 * @returns Vista de UsersScreen con el contrato de propiedades declarado.
 */
export function UsersScreen() {
  const m = useUsers();
  return (
    <Screen refreshing={m.loading} onRefresh={m.refresh}>
      <SectionHeader title="Usuarios" subtitle="Clientes, equipo y permisos del lavadero." />
      <Button label="+ Crear usuario" onPress={m.create} />
      <SearchBar label="Buscar por nombre o email" value={m.search} onChange={m.setSearch} />
      <UserRoleFilter m={m} />
      <Notice message={m.message} error={!m.open ? m.error : ''} />
      <UserCollection m={m} />
      {m.data && (
        <Pagination
          page={m.page}
          total={m.data.total}
          limit={m.data.limit}
          onChange={m.setPage}
        />
      )}
      <UserEditDialog m={m} />
      <UserDeleteDialog m={m} />
    </Screen>
  );
}
