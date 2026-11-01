import { View } from 'react-native';
import type { useAppointments } from '../../hooks/useAppointments';
import { overviewStyles as s } from '../../theme/overview.styles';
import { MetricTile } from '../molecules/MetricTile';
/** Resumen de la fecha consultada, limitado por la API al empleado actual.
 * @param props Resumen del servidor, no deducido desde una página parcial de turnos.
 * @returns Indicadores de trabajos completados y pendientes de la jornada.
 */
export function EmployeeDaySummary({
  summary,
}: {
  summary: ReturnType<typeof useAppointments>['summary'];
}) {
  return (
    <View style={s.row}>
      <MetricTile
        label="Finalizados"
        value={summary ? String(summary.completed) : '—'}
        detail="En la fecha seleccionada"
        icon="check"
      />
      <MetricTile
        label="Por atender"
        value={summary ? String(summary.pending) : '—'}
        detail="Trabajos pendientes de la jornada"
        icon="clock"
      />
    </View>
  );
}
