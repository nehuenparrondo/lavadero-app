import type { Report } from '../../types/entities';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
/** Presenta frecuencias reales de servicios en el período consultado.
 * @param props - Propiedades tipadas: report.
 * @returns Vista de PopularServices con el contrato de propiedades declarado.
 */
export function PopularServices({ report }: { report: Report }) {
  return (
    <Card>
      <Text style={{ fontSize: 20, fontWeight: '800' }}>Servicios más pedidos</Text>
      {report.services.length ? (
        report.services.map((s) => (
          <Text key={s.name}>
            {s.name}: {s.count}
          </Text>
        ))
      ) : (
        <Text>No hay servicios en este período.</Text>
      )}
    </Card>
  );
}
