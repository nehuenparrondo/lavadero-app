import { useVehicleTypes } from '../../hooks/useVehicleTypes';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { Notice } from '../molecules/Notice';
import { VehicleTypeItem } from '../molecules/VehicleTypeItem';
import { VehicleTypeDialog } from './VehicleTypeDialog';
/** Categorías registradas y formularios administrativos sin exponer SQL ni identificadores técnicos.
 * @returns Vista de VehicleTypeManager con el contrato de propiedades declarado.
 */
export function VehicleTypeManager() {
  const m = useVehicleTypes();
  return (
    <>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: '800' }}>Tipos de vehículo</Text>
        <Button label="+ Agregar tipo" variant="secondary" onPress={m.create} />
        <Notice error={m.state.error || m.action.error} message={m.action.message} />
        {m.state.data?.map((type) => (
          <VehicleTypeItem
            key={type.id}
            type={type}
            onEdit={() => m.edit(type)}
            onDeactivate={() => {
              void m.remove(type);
            }}
          />
        ))}
      </Card>
      <VehicleTypeDialog m={m} />
    </>
  );
}
