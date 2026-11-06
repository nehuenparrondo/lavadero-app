import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { EntityForm } from './EntityForm';

/** El responsable explica qué hizo y deja el turno listo para una inspección.
 * @param props - Gestor del turno que recibe el parte.
 * @returns Formulario para describir el trabajo.
 */
export function AppointmentWashSubmit({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  return (
    <EntityForm
      fields={[
        {
          name: 'description',
          label: '¿Qué trabajo realizaste?',
          kind: 'textarea',
          maxLength: 2000,
        },
      ]}
      busy={m.action.busy}
      submitLabel="Enviar a verificación"
      onSubmit={async ({ description }) => {
        await m.mutate('post', '/wash-submission', { description });
      }}
    />
  );
}
