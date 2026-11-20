import type { useAppointmentDetail } from '../../hooks/useAppointmentDetail';
import { Notice } from '../molecules/Notice';
import { EntityForm } from './EntityForm';

/** El cobro completo habilita el cierre directo, conservando descripción y responsable.
 * @param props Detalle del turno con saldo y permisos vigentes.
 * @returns Formulario de finalización o explicación del saldo requerido.
 */
export function EmployeePaidFinish({ m }: { m: ReturnType<typeof useAppointmentDetail> }) {
  const a = m.detail.data;
  if (!a || a.totalCents === undefined || (a.paidCents ?? 0) < a.totalCents)
    return <Notice message="Registrá el cobro completo para habilitar Finalizar lavado." />;
  return (
    <>
      <Notice message="Cobro completo registrado. Describí el trabajo y finalizá el lavado." />
      <EntityForm
        fields={[
          {
            name: 'description',
            label: 'Trabajo realizado',
            kind: 'textarea',
            maxLength: 2000,
          },
        ]}
        busy={m.action.busy}
        submitLabel="Finalizar lavado"
        onSubmit={async ({ description }) => {
          await m.mutate('post', '/finish', { description });
        }}
      />
    </>
  );
}
