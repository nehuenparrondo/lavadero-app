import { useWashFeedback } from '../../hooks/useWashFeedback';
import { Text } from '../atoms/Text';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';

/** Captura una devolución del titular después de que se confirma el trabajo.
 * @param props - Identificador del turno, estado del envío y recarga.
 * @returns Formulario o confirmación de envío previo.
 */
export function WashFeedbackForm({
  appointmentId,
  sent,
  refresh,
}: {
  appointmentId: string;
  sent: boolean;
  refresh: () => Promise<void>;
}) {
  const action = useWashFeedback(appointmentId, refresh);
  if (sent) return <Text>Tu devolución ya llegó a Administración.</Text>;
  return (
    <>
      <Notice error={action.error} message={action.message} />
      <EntityForm
        fields={[
          {
            name: 'body',
            label: '¿Cómo quedó tu vehículo?',
            kind: 'textarea',
            maxLength: 2000,
          },
        ]}
        busy={action.busy}
        submitLabel="Enviar devolución a Administración"
        onSubmit={({ body }) => action.send(body!)}
      />
    </>
  );
}
