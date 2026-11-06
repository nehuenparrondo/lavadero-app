import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import type { WashSubmission } from '../../types/operations';
import { appointmentDate } from '../../utils/format';
import { Text } from '../atoms/Text';
import { Card } from '../molecules/Card';
import { AppointmentWashReview } from './AppointmentWashReview';
import { AppointmentWashSubmit } from './AppointmentWashSubmit';
import { WashFeedbackForm } from './WashFeedbackForm';

/** Detalle del parte con acciones para el responsable, la administración o el titular.
 * @param props - Detalle del turno y acciones según el rol.
 * @returns Parte visible y acciones para la etapa actual.
 */
export function AppointmentWashReport({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  const a = m.detail.data;
  if (!a) return null;
  const wash = a.wash;
  const canSend = m.user?.role === 'employee' && a.canWork && a.status === 'in_progress';
  if (!wash && !canSend && a.status !== 'awaiting_review') return null;
  return (
    <Card>
      <Text style={{ fontWeight: '700' }}>Trabajo realizado</Text>
      {wash && <WashSummary wash={wash} />}
      {!wash && a.status === 'awaiting_review' && (
        <Text>El lavado está pendiente de verificación.</Text>
      )}
      {canSend && <AppointmentWashSubmit key={wash?.id} m={m} />}
      {m.user?.role === 'admin' && a.status === 'awaiting_review' && wash && (
        <AppointmentWashReview key={wash.id} m={m} submissionId={wash.id} />
      )}
      {m.user?.role === 'client' && wash?.decision === 'approved' && (
        <WashFeedbackForm
          appointmentId={a.id}
          sent={Boolean(wash.feedbackId)}
          refresh={m.refresh}
        />
      )}
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
      {wash.reviewerName && <Text>Revisado por {wash.reviewerName}</Text>}
      {wash.reviewNote && <Text>Observación de Administración: {wash.reviewNote}</Text>}
    </>
  );
}
