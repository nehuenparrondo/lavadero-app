import type { Report } from '../../types/entities';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
/** Presenta employee performance con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: report. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function EmployeePerformance({ report }: { report: Report }) {
  return (
    <Card>
      <Text style={{ fontSize: 20, fontWeight: '800' }}>Rendimiento del equipo</Text>
      {report.employees.length ? (
        report.employees.map((e) => (
          <Text key={e.id}>
            {e.name}: {e.completed} trabajos
          </Text>
        ))
      ) : (
        <Text>No hay trabajos finalizados en este período.</Text>
      )}
    </Card>
  );
}
