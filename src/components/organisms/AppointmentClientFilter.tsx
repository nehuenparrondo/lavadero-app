import type { useAppointments } from '../../hooks/useAppointments';
import { SearchSelect } from '../molecules/SearchSelect';
/** Selector administrativo de titular; no se ofrece a otros roles.
 * @param props - Propiedades tipadas: m.
 * @returns Vista de AppointmentClientFilter con el contrato de propiedades declarado.
 */
export function AppointmentClientFilter({ m }: { m: ReturnType<typeof useAppointments> }) {
  return (
    <SearchSelect
      label="Cliente"
      options={[
        { value: '', label: 'Todos' },
        ...m.clients.map((u) => ({
          value: u.id,
          label: `${u.firstName} ${u.lastName}`,
        })),
      ]}
      value={m.clientId}
      onChange={m.setClientId}
    />
  );
}
