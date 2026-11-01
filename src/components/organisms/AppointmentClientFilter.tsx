import type { useAppointments } from '../../hooks/useAppointments';
import { FormField } from '../molecules/FormField';
/** Selector administrativo de titular; no se ofrece a otros roles.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentClientFilter con el contrato de propiedades declarado.
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
