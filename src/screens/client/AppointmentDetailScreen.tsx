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
import { AppointmentVehicleAttachment } from '../../components/organisms/AppointmentVehicleAttachment';
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
      refreshInterval={15_000}
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
      <SectionHeader title={appointmentTitle(a)} subtitle={appointmentDate(a.startsAt)} />
      <AppointmentInformation m={m} />
      {a.vehiclePending ? <PendingVehicle m={m} /> : <AppointmentVehicleDetail m={m} />}
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

/** Los turnos sin patente usan su estado como encabezado. */
function appointmentTitle(
  a: NonNullable<ReturnType<typeof useAppointmentDetail>['detail']['data']>,
) {
  if (a.vehiclePending)
    return a.status === 'confirmed' ? 'Turno confirmado' : 'Detalle del turno';
  return `${a.plate} · ${a.brand} ${a.model}`;
}

/** La agenda muestra el turno aunque todavía no tenga patente. */
function PendingVehicle({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  const a = m.detail.data;
  if (a?.status !== 'confirmed') return null;
  if (m.user?.role === 'employee')
    return <Notice message="Falta cargar el vehículo para comenzar el lavado." />;
  return (
    <AppointmentVehicleAttachment
      appointment={a}
      admin={m.user?.role === 'admin'}
      refresh={m.refresh}
    />
  );
}
