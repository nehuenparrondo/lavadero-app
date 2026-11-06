import { useLocalSearchParams } from 'expo-router';
import { LoadingState } from '../../components/molecules/LoadingState';
import { Notice } from '../../components/molecules/Notice';
import { SectionHeader } from '../../components/molecules/SectionHeader';
import { AppointmentActions } from '../../components/organisms/AppointmentActions';
import { AppointmentDialogs } from '../../components/organisms/AppointmentDialogs';
import { AppointmentInformation } from '../../components/organisms/AppointmentInformation';
import { AppointmentNotes } from '../../components/organisms/AppointmentNotes';
import { AppointmentPayments } from '../../components/organisms/AppointmentPayments';
import { AppointmentVehicleDetail } from '../../components/organisms/AppointmentVehicleDetail';
import { AppointmentWashReport } from '../../components/organisms/AppointmentWashReport';
import { Screen } from '../../components/organisms/Screen';
import { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { appointmentDate } from '../../utils/format';
/** Detalle de reserva con controles del rol, notas y comprobante histórico.
 * @returns Vista de AppointmentDetailScreen con el contrato de propiedades declarado.
 */
export function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const m = useAppointmentDetail(typeof id === 'string' ? id : '');
  const a = m.detail.data;
  return (
    <Screen
      refreshing={m.detail.loading}
      onRefresh={m.refresh}
      refreshInterval={30000}
      onRevalidate={m.detail.revalidate}
    >
      {!a && m.detail.loading && <LoadingState />}
      <Notice
        error={m.detail.error || m.payments.error || m.optionsError || m.action.error}
        message={m.action.message}
        onRetry={m.refresh}
      />
      {a && <AppointmentContent m={m} />}
    </Screen>
  );
}

/** Agrupa el contrato, trabajo, cobros y acciones de un turno ya cargado. */
function AppointmentContent({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  const a = m.detail.data;
  if (!a) return null;
  return (
    <>
      <SectionHeader
        title={`${a.plate} · ${a.brand} ${a.model}`}
        subtitle={appointmentDate(a.startsAt)}
      />
      <AppointmentInformation m={m} />
      <AppointmentVehicleDetail m={m} />
      <AppointmentWashReport m={m} />
      <AppointmentActions manager={m} />
      {m.user?.role !== 'employee' && Boolean(m.payments.data?.length) && (
        <AppointmentPayments m={m} />
      )}
      <AppointmentNotes m={m} />
      <AppointmentDialogs manager={m} />
    </>
  );
}
