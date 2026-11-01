import type { useDashboard } from '../../hooks/useDashboard';
import { useTheme } from '../../hooks/useTheme';
import { money } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { Notice } from '../molecules/Notice';
import { RevenueBar } from '../molecules/RevenueBar';
/** Serie semanal real; no rellena actividad ni fabrica tendencias para decorar el tablero.
 * @param props Recurso semanal con error y reintento independientes.
 * @returns Total y barras con montos textuales; muestra carga o error cuando corresponde.
 */
export function WeeklyActivity({
  resource: r,
}: {
  resource: ReturnType<typeof useDashboard>['week'];
}) {
  const { colors } = useTheme();
  const max = Math.max(1, ...(r.data?.days.map((d) => d.revenueCents) ?? []));
  return (
    <Card>
      <Text style={{ fontSize: 19, fontWeight: '700' }}>Esta semana</Text>
      <Text style={{ fontSize: 28, fontWeight: '700', letterSpacing: -0.6 }}>
        {r.data ? money(r.data.revenueCents) : '—'}
      </Text>
      <Text style={{ fontSize: 12, color: colors.muted }}>Ingresos registrados · ARS</Text>
      <Notice error={r.error} onRetry={r.refresh} />
      {r.loading && !r.data && (
        <Text style={{ color: colors.muted }}>Consultando actividad…</Text>
      )}
      {r.data?.days.map((day) => (
        <RevenueBar key={day.date} date={day.date} cents={day.revenueCents} max={max} />
      ))}
      {r.data && !r.data.days.length && (
        <Text style={{ color: colors.muted, fontSize: 13 }}>
          Sin actividad registrada en este período.
        </Text>
      )}
    </Card>
  );
}
