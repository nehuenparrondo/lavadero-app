import { Notice } from '../../components/molecules/Notice';
import { Button } from '../../components/atoms/Button';
import { Pagination } from '../../components/molecules/Pagination';
import { SearchBar } from '../../components/molecules/SearchBar';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Screen } from '../../components/organisms/Screen';
import { UserCollection } from '../../components/organisms/UserCollection';
import { UserDeleteDialog } from '../../components/organisms/UserDeleteDialog';
import { UserEditDialog } from '../../components/organisms/UserEditDialog';
import { UserRoleFilter } from '../../components/organisms/UserRoleFilter';
import { useUsers } from '../../hooks/useUsers';
/** ABML de clientes y empleados; los roles se eligen únicamente al crear.
 * @returns Vista de UsersScreen con el contrato de propiedades declarado.
 */
export function UsersScreen() {
  const m = useUsers();
  return (
    <Screen refreshing={m.loading} onRefresh={m.refresh} onRevalidate={m.revalidate}>
      <SectionHeader
        title="Usuarios"
        subtitle="Creá y administrá las cuentas de clientes y empleados."
      />
      <Button label="Agregar usuario" icon="plus" onPress={m.create} />
      <Notice message="Elegí cliente o empleado al crear la cuenta. Al editar, su rol se conserva." />
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
