import type { Report } from '../../types/entities';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
/** Presenta popular services con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: report. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
