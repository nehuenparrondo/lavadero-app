import { View } from 'react-native';
import { useVehicles } from '../../hooks/useVehicles';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { CollectionState } from './CollectionState';
import { ResponsiveGrid } from '../molecules/ResponsiveGrid';
/** Cuadrícula de vehículos autorizados con edición y baja confirmada.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de VehicleCollection con el contrato de propiedades declarado.
 */
export function VehicleCollection({ m }: { m: ReturnType<typeof useVehicles> }) {
  return (
    <CollectionState
      loading={m.loading}
      error={m.fetchError}
      empty={!m.data?.items.length}
      emptyTitle="Todavía no hay vehículos registrados"
      onRetry={m.refresh}
    >
      <ResponsiveGrid>
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
      </ResponsiveGrid>
    </CollectionState>
  );
}
