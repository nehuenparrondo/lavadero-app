import { View } from 'react-native';
import { Screen } from '../../components/organisms/Screen';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Input } from '../../components/atoms/Input';
import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/molecules/Card';
import { Text } from '../../components/atoms/Text';
import { Notice } from '../../components/molecules/Notice';
import { VehicleEditor } from '../../components/organisms/VehicleEditor';
import { CollectionState } from '../../components/organisms/CollectionState';
import { Pagination } from '../../components/molecules/Pagination';
import { useVehicles } from '../../hooks/useVehicles';
/** Vehículos propios o administración de titulares, con ABML y búsqueda. */
export function VehiclesScreen() {
  const m = useVehicles();
  return (
    <Screen
      refreshing={m.loading}
      onRefresh={() => {
        void m.refresh();
      }}
    >
      <SectionHeader
        title="Mis vehículos"
        subtitle="Todos los datos de tus vehículos, en un solo lugar."
      />
      <Button label="+ Agregar vehículo" onPress={m.create} />
      <Input
        accessibilityLabel="Buscar patente o marca"
        placeholder="Buscar patente o marca"
        value={m.search}
        onChangeText={m.setSearch}
      />
      <Notice message={m.message} error={!m.open && !m.deleting ? m.error : ''} />
      <CollectionState
        loading={m.loading}
        error={m.fetchError}
        empty={!m.data?.items.length}
        emptyTitle="Todavía no hay vehículos registrados"
        onRetry={() => {
          void m.refresh();
        }}
      >
        {m.data?.items.map((v) => (
          <Card key={v.id}>
            <Text style={{ fontSize: 22, fontWeight: '800' }}>{v.plate}</Text>
            <Text>
              {v.brand} {v.model} · {v.color} · {v.typeName}
            </Text>
            <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
              <Button label="Editar" variant="secondary" onPress={() => m.edit(v)} />
              <Button label="Eliminar" variant="quiet" onPress={() => m.requestDelete(v)} />
            </View>
          </Card>
        ))}
      </CollectionState>
      {m.data && (
        <Pagination
          page={m.page}
          total={m.data.total}
          limit={m.data.limit}
          onChange={m.setPage}
        />
      )}
      <VehicleEditor manager={m} />
    </Screen>
  );
}
