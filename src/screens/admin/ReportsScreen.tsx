import { Screen } from '../../components/organisms/Screen';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { ChoiceGroup } from '../../components/molecules/ChoiceGroup';
import { Input } from '../../components/atoms/Input';
import { Notice } from '../../components/molecules/Notice';
import { ReportSummary } from '../../components/organisms/ReportSummary';
import { useReports } from '../../hooks/useReports';
/** Reportes administrativos por día, semana o mes. */
export function ReportsScreen() {
  const r = useReports();
  return (
    <Screen
      refreshing={r.loading}
      onRefresh={() => {
        void r.refresh();
      }}
    >
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
      <Notice
        error={r.error}
        onRetry={() => {
          void r.refresh();
        }}
      />
      {r.data && <ReportSummary report={r.data} />}
    </Screen>
  );
}
