import type { Report } from '../../types/entities';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { ProgressBar } from '../molecules/ProgressBar';

/** Compara semanas con cifras recalculadas por el servidor, sin metas ficticias.
 * @param props Reporte del período elegido; la primera y última semana pueden ser parciales.
 * @returns Barras de ingresos agrupadas de lunes a domingo.
 */
export function RevenueByWeek({ report }: { report: Report }) {
  const weeks = report.weeks ?? [];
  const max = Math.max(1, ...weeks.map((w) => w.revenueCents));
  return (
    <Card>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>Ingresos por semana</Text>
      <Text>
        Cobros registrados de lunes a domingo. Las barras se actualizan automáticamente.
      </Text>
      {weeks.map((w) => (
        <ProgressBar
          key={w.from}
          label={`${shortDate(w.from)} al ${shortDate(w.to)}`}
          value={w.revenueCents}
          max={max}
          detail={money(w.revenueCents)}
        />
      ))}
      {!weeks.length && <Text>Sin ingresos en este período.</Text>}
    </Card>
  );
}

/** Fecha local independiente de la zona horaria del dispositivo. */
function shortDate(date: string) {
  return `${date.slice(8, 10)}/${date.slice(5, 7)}`;
}
