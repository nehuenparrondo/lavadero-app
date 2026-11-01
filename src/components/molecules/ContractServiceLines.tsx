import type { Appointment } from '../../types/entities';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
/** Servicios históricos; solo muestra importes que el servidor incluyó en la proyección del rol.
 * @param props - Propiedades tipadas: items, showDuration. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
