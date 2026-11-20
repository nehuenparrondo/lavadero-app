import type { Availability } from '../../types/entities';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from './Card';
/** Total y duración estimados exactamente como los devuelve la cotización del servidor.
 * @param props - Propiedades tipadas: quote.
 * @returns Vista de QuotedTotal con el contrato de propiedades declarado.
 */
export function QuotedTotal({ quote }: { quote: Availability }) {
  return (
    <Card>
      <Text style={{ fontSize: 24, fontWeight: '800' }}>{money(quote.totalCents)}</Text>
      <Text>{quote.durationMinutes} minutos estimados · ARS</Text>
    </Card>
  );
}
