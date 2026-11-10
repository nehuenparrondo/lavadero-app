import { Button } from '../../components/atoms/Button';
import { Notice } from '../../components/molecules/Notice';
import { Pagination } from '../../components/molecules/Pagination';
import { SearchBar } from '../../components/molecules/SearchBar';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { Screen } from '../../components/organisms/Screen';
import { VehicleCollection } from '../../components/organisms/VehicleCollection';
import { VehicleEditor } from '../../components/organisms/VehicleEditor';
import { VehicleTypeManager } from '../../components/organisms/VehicleTypeManager';
import { useVehicles } from '../../hooks/useVehicles';
/** Vehículos propios o administración de titulares, con ABML y búsqueda.
 * @returns Vista de VehiclesScreen con el contrato de propiedades declarado.
 */
export function VehiclesScreen() {
  const m = useVehicles();
  return (
    <Screen refreshing={m.loading} onRefresh={m.refresh}>
      <SectionHeader
        title={m.admin ? 'Vehículos' : 'Mis vehículos'}
        subtitle="Todos los datos de tus vehículos, en un solo lugar."
      />
      <Button label="+ Agregar vehículo" onPress={m.create} />
      {m.admin && <VehicleTypeManager onChanged={m.refresh} />}
      <SearchBar label="Buscar patente o marca" value={m.search} onChange={m.setSearch} />
      <Notice message={m.message} error={!m.open && !m.deleting ? m.error : ''} />
      <VehicleCollection m={m} />
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
