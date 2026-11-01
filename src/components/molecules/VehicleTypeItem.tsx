import { View } from 'react-native';
import type { VehicleType } from '../../types/entities';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
/** Categoría y acciones del catálogo; una baja lógica conserva el nombre visible en el historial.
 * @param props - Propiedades tipadas: type, onEdit, onDeactivate. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function VehicleTypeItem({
  type,
  onEdit,
  onDeactivate,
}: {
  type: VehicleType;
  onEdit: () => void;
  onDeactivate: () => void;
}) {
  return (
    <View style={{ gap: 8 }}>
      <Text>
        {type.name}
        {type.isActive ? '' : ' · Inactivo'}
      </Text>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Button label="Editar" variant="quiet" onPress={onEdit} />
        {type.isActive && <Button label="Desactivar" variant="quiet" onPress={onDeactivate} />}
      </View>
    </View>
  );
}
