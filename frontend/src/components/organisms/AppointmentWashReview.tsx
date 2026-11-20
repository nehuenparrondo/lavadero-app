import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import type { FormFieldDefinition } from '../../types/form';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { EntityForm } from './EntityForm';

const fields: FormFieldDefinition[] = [
  { name: 'note', label: 'Motivo si falta corregir algo', kind: 'textarea', maxLength: 1000 },
];

/** La decisión siempre identifica el parte revisado para evitar aprobar un envío posterior.
 * @param props - Gestor del turno e identificador del parte inspeccionado.
 * @returns Controles para aprobar o devolver el lavado.
 */
export function AppointmentWashReview({
  m,
  submissionId,
}: {
  m: ReturnType<typeof useAppointmentDetail>;
  submissionId: string;
}) {
  return (
    <>
      <Text>Comprobá el vehículo y compará lo realizado con los servicios del turno.</Text>
      <Button
        label="Confirmar lavado realizado"
        loading={m.action.busy}
        onPress={() => {
          void m.mutate('patch', '/wash-review', { submissionId, decision: 'approved' });
        }}
      />
      <EntityForm
        fields={fields}
        busy={m.action.busy}
        submitLabel="Devolver al empleado"
        onSubmit={async ({ note }) => {
          await m.mutate('patch', '/wash-review', {
            submissionId,
            decision: 'returned',
            note,
          });
        }}
      />
    </>
  );
}
