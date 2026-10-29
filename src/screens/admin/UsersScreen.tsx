import { Screen } from '../../components/organisms/Screen';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { ChoiceGroup } from '../../components/molecules/ChoiceGroup';
import { UserTable } from '../../components/organisms/UserTable';
import { CollectionState } from '../../components/organisms/CollectionState';
import { Pagination } from '../../components/molecules/Pagination';
import { ModalPanel } from '../../components/organisms/ModalPanel';
import { EntityForm } from '../../components/organisms/EntityForm';
import { Notice } from '../../components/molecules/Notice';
import { Text } from '../../components/atoms/Text';
import { useUsers } from '../../hooks/useUsers';
/** ABML de usuarios con filtros y cambios de rol reservados al administrador. */
export function UsersScreen() {
  const m = useUsers();
  return (
    <Screen
      refreshing={m.loading}
      onRefresh={() => {
        void m.refresh();
      }}
    >
      <SectionHeader title="Usuarios" subtitle="Clientes, equipo y permisos del lavadero." />
      <Button label="+ Crear usuario" onPress={m.create} />
      <Input
        accessibilityLabel="Buscar usuario"
        placeholder="Buscar por nombre o email"
        value={m.search}
        onChangeText={m.setSearch}
      />
      <ChoiceGroup
        value={m.role}
        onChange={m.setRole}
        options={[
          { value: '', label: 'Todos' },
          { value: 'client', label: 'Clientes' },
          { value: 'employee', label: 'Empleados' },
          { value: 'admin', label: 'Administradores' },
        ]}
      />
      <Notice message={m.message} error={!m.open ? m.error : ''} />
      <CollectionState
        loading={m.loading}
        error={m.fetchError}
        empty={!m.data?.items.length}
        emptyTitle="No hay usuarios con estos filtros"
        onRetry={() => {
          void m.refresh();
        }}
      >
        <UserTable users={m.data?.items ?? []} onEdit={m.edit} onDelete={m.requestDelete} />
      </CollectionState>
      {m.data && (
        <Pagination
          page={m.page}
          total={m.data.total}
          limit={m.data.limit}
          onChange={m.setPage}
        />
      )}
      <ModalPanel
        visible={m.open}
        title={m.editing ? 'Editar usuario' : 'Crear usuario'}
        onClose={m.close}
      >
        <Notice error={m.error} />
        <EntityForm
          key={m.editing?.id ?? 'new'}
          fields={m.fields}
          initialValues={m.initialValues}
          onSubmit={m.save}
          busy={m.busy}
        />
      </ModalPanel>
      <ModalPanel
        visible={Boolean(m.deleting)}
        title="Eliminar usuario"
        onClose={m.cancelDelete}
      >
        <Text>
          ¿Querés eliminar a {m.deleting?.firstName} {m.deleting?.lastName}? Sus turnos
          conservarán el historial.
        </Text>
        <Notice error={m.error} />
        <Button
          label="Eliminar usuario"
          variant="danger"
          loading={m.busy}
          onPress={() => {
            void m.remove();
          }}
        />
      </ModalPanel>
    </Screen>
  );
}
