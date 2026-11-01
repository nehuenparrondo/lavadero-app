import type { Report } from '../../types/entities';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
/** Presenta trabajos completados por empleado en el período.
 * @param props - Propiedades tipadas: report.
 * @returns Vista de EmployeePerformance con el contrato de propiedades declarado.
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
