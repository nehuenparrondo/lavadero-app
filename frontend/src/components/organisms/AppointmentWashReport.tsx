import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import type { WashSubmission } from '../../types/operations';
import { appointmentDate } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { AppointmentWashReview } from './AppointmentWashReview';
import { AppointmentWashSubmit } from './AppointmentWashSubmit';
import { WashFeedbackForm } from './WashFeedbackForm';
import { EmployeePaidFinish } from './EmployeePaidFinish';

/** Detalle del parte con acciones para el responsable, la administración o el titular.
 * @param props - Detalle del turno y acciones según el rol.
 * @returns Parte visible y acciones para la etapa actual.
 */
export function AppointmentWashReport({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  const a = m.detail.data;
  if (!a) return null;
  const wash = a.wash;
  const canSend =
    m.user?.role === 'employee' &&
    a.canWork &&
    (a.status === 'in_progress' || (a.status === 'awaiting_review' && m.canPay));
  if (!wash && !canSend && a.status !== 'awaiting_review') return null;
  return (
    <Card>
      <Text style={{ fontWeight: '700' }}>Trabajo realizado</Text>
      {wash && <WashSummary wash={wash} />}
      {!wash && a.status === 'awaiting_review' && (
        <Text>El lavado está pendiente de verificación.</Text>
      )}
      <WashActions m={m} wash={wash} canSend={Boolean(canSend)} />
    </Card>
  );
}

/** Registra visualmente lo declarado y la observación administrativa visible al equipo. */
function WashSummary({ wash }: { wash: WashSubmission }) {
  return (
    <>
      <Text>
        {wash.employeeName} · {appointmentDate(wash.submittedAt)}
      </Text>
      <Text>{wash.description}</Text>
      {wash.completedByEmployee && (
        <Text>Finalizado por el empleado tras registrar el cobro completo.</Text>
      )}
      {wash.reviewerName && <Text>Revisado por {wash.reviewerName}</Text>}
      {wash.reviewNote && <Text>Observación de Administración: {wash.reviewNote}</Text>}
    </>
  );
}

/** Mantiene separadas la finalización cobrada, la revisión antigua y la devolución del cliente. */
function WashActions({
  m,
  wash,
  canSend,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
  wash: WashSubmission | null | undefined;
  canSend: boolean;
}) {
  const a = m.detail.data!;
  return (
    <>
      {canSend &&
        (m.canPay ? (
          <EmployeePaidFinish key={wash?.id} m={m} />
        ) : (
          <AppointmentWashSubmit key={wash?.id} m={m} />
        ))}
      {m.user?.role === 'admin' && a.status === 'awaiting_review' && wash && (
        <AppointmentWashReview key={wash.id} m={m} submissionId={wash.id} />
      )}
      {m.user?.role === 'client' &&
        wash &&
        (wash.decision === 'approved' || wash.completedByEmployee) && (
          <WashFeedbackForm
            appointmentId={a.id}
            sent={Boolean(wash.feedbackId)}
            refresh={m.refresh}
          />
        )}
    </>
  );
}
