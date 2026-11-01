import { View } from 'react-native';
import type { Service } from '../../types/entities';
import { money } from '../../utils/format';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { Card } from './Card';
/** Servicio con descripción, duración y tarifa del tipo seleccionado.
 * @param props - Propiedades tipadas: service, typeId, onEdit, onPrice, onDelete. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function ServiceCard({
  service,
  typeId,
  onEdit,
  onPrice,
  onDelete,
}: {
  service: Service;
  typeId: string;
  onEdit?: () => void;
  onPrice?: () => void;
  onDelete?: () => void;
}) {
  const price = service.prices.find((p) => p.vehicleTypeId === typeId)?.priceCents;
  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: '800' }}>{service.name}</Text>
        <Badge label={`${service.durationMinutes} min`} />
      </View>
      <Text>{service.description}</Text>
      <Text style={{ fontSize: 23, fontWeight: '800' }}>
        {price ? money(price) : 'Seleccioná un tipo para consultar el precio'}
      </Text>
      {!service.isActive && <Badge label="Inactivo" tone="warning" />}
      {onEdit && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Button label="Editar" variant="secondary" onPress={onEdit} />
          {onPrice && <Button label="Precios" variant="secondary" onPress={onPrice} />}{' '}
          {onDelete && <Button label="Eliminar" variant="quiet" onPress={onDelete} />}
        </View>
      )}
    </Card>
  );
}
