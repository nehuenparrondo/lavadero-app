import type { Appointment } from '../../types/entities';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
/** Servicios históricos; solo muestra importes que el servidor incluyó en la proyección del rol.
 * @param props - Propiedades tipadas: items, showDuration.
 * @returns Vista de ContractServiceLines con el contrato de propiedades declarado.
 */
export function ContractServiceLines({
  items,
  showDuration = false,
}: {
  items: NonNullable<Appointment['services']>;
  showDuration?: boolean;
}) {
  return (
    <>
      {items.map((item) => (
        <Text key={item.serviceId}>
          {item.name}
          {showDuration ? ` · ${item.durationMinutes} min` : ''}
          {item.priceCents !== undefined ? ` · ${money(item.priceCents)}` : ''}
        </Text>
      ))}
    </>
  );
}
