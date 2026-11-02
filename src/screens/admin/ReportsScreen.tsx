import { DateInput } from '../../components/molecules/DateInput';
import { ChoiceGroup } from '../../components/molecules/ChoiceGroup';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { ReportSummary } from '../../components/organisms/ReportSummary';
import { Screen } from '../../components/organisms/Screen';
import { useReports } from '../../hooks/useReports';
/** Reportes administrativos por día, semana o mes.
 * @returns Vista de ReportsScreen con el contrato de propiedades declarado.
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
      <DateInput label="Fecha de referencia del reporte" value={r.date} onChange={r.setDate} />
      <Notice error={r.error} onRetry={r.refresh} />
      {r.data && <ReportSummary report={r.data} />}
    </Screen>
  );
}
