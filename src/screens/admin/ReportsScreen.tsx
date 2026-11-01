import { Input } from '../../components/atoms/Input';
import { ChoiceGroup } from '../../components/molecules/ChoiceGroup';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { ReportSummary } from '../../components/organisms/ReportSummary';
import { Screen } from '../../components/organisms/Screen';
import { useReports } from '../../hooks/useReports';
/** Reportes administrativos por día, semana o mes.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function ReportsScreen() {
  const r = useReports();
  return (
    <Screen refreshing={r.loading} onRefresh={r.refresh}>
      <SectionHeader
        title="Reportes"
        subtitle="Actividad e ingresos del lavadero, con datos de cobros registrados."
      />
      <ChoiceGroup
        value={r.period}
        onChange={r.setPeriod}
        options={[
          { value: 'day', label: 'Día' },
          { value: 'week', label: 'Semana' },
          { value: 'month', label: 'Mes' },
        ]}
      />
      <Input
        accessibilityLabel="Fecha de referencia del reporte"
        value={r.date}
        onChangeText={r.setDate}
        placeholder="AAAA-MM-DD"
      />
      <Notice error={r.error} onRetry={r.refresh} />
      {r.data && <ReportSummary report={r.data} />}
    </Screen>
  );
}
