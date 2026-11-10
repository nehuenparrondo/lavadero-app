import { useVehicleTypes } from '../../hooks/useVehicleTypes';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { Notice } from '../molecules/Notice';
import { VehicleTypeItem } from '../molecules/VehicleTypeItem';
import { VehicleTypeDialog } from './VehicleTypeDialog';
/** Categorías registradas y formularios administrativos sin exponer SQL ni identificadores técnicos.
 * @param props Recarga opcional de vehículos cuando se modifica el catálogo.
 * @returns Vista de VehicleTypeManager con el contrato de propiedades declarado.
 */
export function VehicleTypeManager({ onChanged }: { onChanged?: () => Promise<void> }) {
  const m = useVehicleTypes(onChanged);
  return (
    <>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: '800' }}>Tipos de vehículo y tarifas</Text>
        <Text>Los precios por servicio se aplican a todos los vehículos de ese tipo.</Text>
        <Button label="+ Agregar tipo y tarifas" variant="secondary" onPress={m.create} />
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
