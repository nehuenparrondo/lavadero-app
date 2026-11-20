import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
import { cancellationFields } from '../../constants/appointmentFields';
/** Solicita motivo y confirma la cancelación mediante el comando del turno.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentCancellationDialog con el contrato de propiedades declarado.
 */
export function AppointmentCancellationDialog({
  m,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
}) {
  return (
    <ModalPanel
      visible={m.cancelOpen}
      title="Cancelar turno"
      onClose={() => m.setCancelOpen(false)}
    >
      <Text>
        Este horario quedará libre. El motivo se guardará en el turno y el cliente podrá
        consultarlo.
      </Text>
      <Notice error={m.action.error} />
      <EntityForm
        fields={cancellationFields}
        onSubmit={m.cancel}
        busy={m.action.busy}
        submitLabel="Confirmar cancelación"
      />
    </ModalPanel>
  );
}
