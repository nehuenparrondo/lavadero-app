import type { useAppointments } from '../../hooks/useAppointments';
import { FormField } from '../molecules/FormField';
/** Presenta appointment client filter con datos y acciones recibidos de su hook.
 * @param props - Propiedades tipadas: m. Los callbacks conectan la interacción con su hook.
 * @returns Elemento React de esta pieza visual; puede omitir contenido cuando no corresponde al estado actual.
 */
export function AppointmentClientFilter({ m }: { m: ReturnType<typeof useAppointments> }) {
  return (
    <FormField
      field={{
        name: 'client',
        label: 'Cliente',
        kind: 'choice',
        options: [
          { value: '', label: 'Todos' },
          ...m.clients.map((u) => ({
            value: u.id,
            label: `${u.firstName} ${u.lastName}`,
          })),
        ],
      }}
      value={m.clientId}
      onChange={m.setClientId}
    />
  );
}
