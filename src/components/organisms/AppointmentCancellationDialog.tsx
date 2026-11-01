import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';
import { ModalPanel } from './ModalPanel';
/** Presenta appointment cancellation dialog con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
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
      <Text>La cancelación liberará este horario.</Text>
      <Notice error={m.action.error} />
      <EntityForm
        fields={[
          { name: 'reason', label: 'Motivo (opcional)', required: false, maxLength: 500 },
        ]}
        onSubmit={m.cancel}
        busy={m.action.busy}
        submitLabel="Confirmar cancelación"
      />
    </ModalPanel>
  );
}
