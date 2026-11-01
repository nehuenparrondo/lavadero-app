import type { Report } from '../../types/entities';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { RevenueBar } from '../molecules/RevenueBar';
/** Visualiza ingresos reales por día con las mismas barras accesibles del tablero.
 * @param props Reporte del período seleccionado, con importes en centavos.
 * @returns Serie de días y sus cifras; no genera datos de reemplazo.
 */
export function RevenueByDay({ report }: { report: Report }) {
  const max = Math.max(1, ...report.days.map((d) => d.revenueCents));
  return (
    <Card>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>Ingresos por día</Text>
      {report.days.map((d) => (
        <RevenueBar key={d.date} date={d.date} cents={d.revenueCents} max={max} />
      ))}
    </Card>
  );
}
